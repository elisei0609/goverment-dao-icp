import { useFonts } from "expo-font";
import { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Clipboard } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import { MaterialIcons } from '@expo/vector-icons';

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
            <SafeAreaView style={styles.page}>
                <Text style={styles.title}>Assets</Text>

                <View style={styles.assetsContainer}>
                    {assets.map((asset, index) => (
                        <View key={index} style={styles.assetCard}>
                            <View style={styles.assetRow}>
                                <View style={styles.assetInfo}>
                                    <View style={styles.icon}>
                                        {/* Іконка */}
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
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M2 3C2 2.44772 2.44772 2 3 2H5C5.55228 2 6 1.55228 6 1C6 0.44772 5.55228 0 5 0H3C1.34315 0 0 1.34315 0 3V5C0 5.55229 0.44772 6 1 6C1.55228 6 2 5.55229 2 5V3Z"
                                                fill="white"/>
                                            <path
                                                d="M18 17C18 17.5523 17.5523 18 17 18H15C14.4477 18 14 18.4477 14 19C14 19.5523 14.4477 20 15 20H17C18.6569 20 20 18.6569 20 17V15C20 14.4477 19.5523 14 19 14C18.4477 14 18 14.4477 18 15V17Z"
                                                fill="white"/>
                                            <path
                                                d="M2 17C2 17.5523 2.44772 18 3 18H5C5.55229 18 6 18.4477 6 19C6 19.5523 5.55229 20 5 20H3C1.34315 20 0 18.6569 0 17V15C0 14.4477 0.44772 14 1 14C1.55229 14 2 14.4477 2 15V17Z"
                                                fill="white"/>
                                            <path
                                                d="M17 2C17.5523 2 18 2.44772 18 3V5C18 5.55228 18.4477 6 19 6C19.5523 6 20 5.55229 20 5V3C20 1.34315 18.6569 0 17 0H15C14.4477 0 14 0.44772 14 1C14 1.55228 14.4477 2 15 2H17Z"
                                                fill="white"/>
                                            <path
                                                d="M4 8C4 8.5523 4.44772 9 5 9H8C8.5523 9 9 8.5523 9 8V5C9 4.44772 8.5523 4 8 4H5C4.44772 4 4 4.44771 4 5V8Z"
                                                fill="white"/>
                                            <path
                                                d="M4 15C4 15.5523 4.44772 16 5 16H8C8.5523 16 9 15.5523 9 15V12C9 11.4477 8.5523 11 8 11H5C4.44772 11 4 11.4477 4 12V15Z"
                                                fill="white"/>
                                            <path
                                                d="M11 8C11 8.5523 11.4477 9 12 9H15C15.5523 9 16 8.5523 16 8V5C16 4.44772 15.5523 4 15 4H12C11.4477 4 11 4.44771 11 5V8Z"
                                                fill="white"/>
                                            <path
                                                d="M11 15C11 15.5523 11.4477 16 12 16H15C15.5523 16 16 15.5523 16 15V12C16 11.4477 15.5523 11 15 11H12C11.4477 11 11 11.4477 11 12V15Z"
                                                fill="white"/>
                                        </svg>
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














