import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#202023',
    },
    pageHeadingContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        minHeight: 100,
    },
    pageHeadingText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 30,
        textAlign: 'center',
    },
    defaultButton: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#3C3E46',
        paddingHorizontal: 16,
        marginVertical: 12,
        backgroundColor: '#202023',
    },
});
