import { useFonts } from "expo-font";
import { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Clipboard, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import { MaterialIcons } from '@expo/vector-icons';
import { commonStyles } from "@/constants/theme";

interface Asset {
    symbol: string;
    amount: number;
    valueUSD: number;
}

export default function AssetsView() {
    const [fontsLoaded] = useFonts({
        'Inter': require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

    const copyToClipboard = () => {
        Clipboard.setString('CWfrMs6SVEffYmB73JgUhKo6');
    };

    useEffect(() => {
        setTimeout(() => {
            setAssets([
                { symbol: "BTC", amount: 0.0003434, valueUSD: 120.20 },
                { symbol: "ETH", amount: 1.12, valueUSD: 3013.00 },
                { symbol: "DAI", amount: 0.0132, valueUSD: 632.15 },
                { symbol: "USDC", amount: 0, valueUSD: 0 },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const handleQrPress = (asset: Asset) => {
        setSelectedAsset(asset);
        setModalVisible(true);
    };

    if (!fontsLoaded || loading) {
        return (
            <View style={styles.page}>
                <Text style={{ color: 'white' }}>Loading...</Text>
            </View>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={commonStyles.pageContainer}>
                <Text style={styles.title}>Assets</Text>

                <View style={styles.assetsContainer}>
                    {assets.map((asset, index) => (
                        <View key={index} style={styles.assetCard}>
                            <View style={styles.assetRow}>
                                <View style={styles.assetInfo}>
                                    <View style={styles.icon}>
                                        <Image source={require('../assets/icons/bitcoin-icon.png')} />
                                    </View>
                                    <View>
                                        <Text style={styles.symbol}>{asset.symbol}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <Text style={styles.amount}>
                                            {asset.amount.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 6,
                                            })}
                                        </Text>
                                        <Text style={styles.value}>
                                            ${asset.valueUSD.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                        </Text>
                                    </View>
                                    <Pressable
                                        style={styles.qrButton}
                                        onPress={() => handleQrPress(asset)}
                                    >
                                        <Image source={require('../assets/icons/open-wallet-icon.png')} />
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                {selectedAsset ? ` Receive ${selectedAsset.symbol}` : ''}
                            </Text>

                            <View style={styles.whiteQrContainer}>
                                <QRCode
                                    size={160}
                                    value={selectedAsset ? `${selectedAsset.symbol}:${selectedAsset.amount}` : ''}
                                    color="black"
                                    backgroundColor="white"
                                />


                            </View>
                            <View style={styles.copyContainer}>
                                <Text style={styles.addressText} selectable={true}>
                                    CWfrMs6SVEffYmB73JgUhKo6
                                </Text>
                                <Pressable onPress={copyToClipboard} style={styles.copyButton}>
                                    <MaterialIcons name="content-copy" size={20} color="#666" />
                                </Pressable>
                            </View>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 16,
        backgroundColor: '#202023',
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 32,
        textAlign: 'center',
        color: 'white',
    },
    assetsContainer: {
        flexDirection: 'column',
        gap: 8,
        backgroundColor: '#292A2F',
        borderRadius: 16,
    },
    whiteQrContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    copyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#292A2F',
        borderRadius: 8,
        width: '100%',
    },
    addressText: {
        fontFamily: 'monospace',
        flex: 1,
        fontSize: 14,
        color: '#9Ea0a8',
    },
    copyButton: {
        marginLeft: 10,
        padding: 5,
    },
    assetCard: {
        padding: 16,
        backgroundColor: '#292A2F',
        borderRadius: 16,
        height: 64,
    },
    assetRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    assetInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    icon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    symbol: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        marginBottom: 4,
    },
    amount: {
        fontSize: 16,
        color: '#3B82F6',
        marginBottom: 4,
        textAlign: 'right',
    },
    value: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'right',
    },
    qrButton: {
        width: 32,
        height: 32,
        backgroundColor: '#3A3A3A',
        borderRadius: 8,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: '#202023',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 8,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#3C3e46',
        width: '100%',
        marginTop: 20,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'white',
    },
});














