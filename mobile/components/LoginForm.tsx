import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import {useFonts} from "expo-font";

export default function LoginForm() {
    const [fontsLoaded] = useFonts({
        'Inter': require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
    });
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recovery Phrase</Text>
            <Text style={styles.text} >Restore an existing wallet with your <br/> 12 or 24-word recovery phrase</Text>
            <div style={styles.buttons}>
                <form action="">
                    <input placeholder={'Recovery Phrase'} style={styles.input} type="text"/>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.text}>Import Recovery Phrase</Text>
                    </TouchableOpacity>
                </form>
            </div>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        backgroundColor: '#202023',
        color: '#fff',
        fontFamily: 'Inter',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 120,
        color: '#fff',
        marginBottom: 15,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 50,
    },
    input: {
        width: 300,
        height: 40,
        backgroundColor: '#191919',
        borderRadius: 5,
        marginBottom: 10,
        outline: 'solid',
        color: '#8a8a8a'
    },
    text: {
        color: '#6B7280',
        fontSize: 16,
        textAlign: 'center',

    },
    button: {
        backgroundColor: '#3A3A3A',
        width: 300,
        height: 40,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    }
})
