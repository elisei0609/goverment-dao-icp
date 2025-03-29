import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import * as bip39 from 'bip39';
import { Buffer } from 'buffer';
import 'react-native-get-random-values';
import { useFonts } from "expo-font";

global.Buffer = Buffer;

const RegisterForm = () => {
    const [mnemonic, setMnemonic] = useState('');
    const [phrases, setPhrases] = useState<string[]>([]);
    const [fontsLoaded] = useFonts({
        'Inter': require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
    });

    const generateMnemonic = async () => {
        try {
            const mnemonic = await bip39.generateMnemonic(128);
            setMnemonic(mnemonic);
            setPhrases(mnemonic.split(' '));
        } catch (error) {
            console.error('Помилка генерації:', error);
            Alert.alert('Помилка', 'Не вдалося згенерувати фразу');
        }
    };

    useEffect(() => {
        generateMnemonic();
    }, []);

    const copyToClipboard = async () => {
        try {
            await Clipboard.setStringAsync(mnemonic);
        } catch (error) {
            console.error('Copy error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recovery Phrase</Text>
            <Text style={styles.text}>This is the only way you will be able to <br/>recover your account. Please store it <br/>somewhere safe!</Text>

            <ScrollView style={styles.wordsContainer}>
                <View style={styles.wordsGrid}>
                    {phrases.map((word, index) => (
                        <View key={index} style={styles.wordItem}>
                            <Text style={styles.wordText}>{index + 1}. {word}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={[styles.button, styles.createButton]}
                    onPress={() => {}}
                >
                    <Text style={styles.createButtonText}>Create Wallet</Text>
                </TouchableOpacity>
                <View style={styles.iconButtonsContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.iconButton]}
                        onPress={copyToClipboard}
                    >
                        <MaterialCommunityIcons name="content-copy" size={20} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.iconButton, {marginLeft: 10}]}
                        onPress={generateMnemonic}
                    >
                        <MaterialCommunityIcons name="refresh" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#202023',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Inter'
    },
    text: {
        fontSize: 16,
        fontWeight: 'semibold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#9Ea0a8',
        fontFamily: 'Inter'
    },
    wordsContainer: {
        flex: 1,
        marginBottom: 20,
        backgroundColor: '#292A2F',
        borderRadius: 8,
    },
    wordsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    wordItem: {
        width: '48%',
        padding: 12,
        marginBottom: 8,
    },
    wordText: {
        fontSize: 16,
        color: '#9Ea0a8',
        fontFamily: 'Inter'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    iconButtonsContainer: {
        flexDirection: 'row',
    },
    button: {
        padding: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    iconButton: {
        width: 50,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#ffffff',
        marginLeft: 10,
    },
    createButton: {
        flex: 1,
        marginLeft: 10,
        backgroundColor: '#ffffff',
    },
    createButtonText: {
        color: '#202023',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Inter'
    }
});

export default RegisterForm;