import { FlatList, View, StyleSheet, Text, Image, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { commonStyles } from '@/constants/theme';

export const daosMock = [{
    name: 'My DAO 123',
    description: 'My DAO description 123',
    proposals: [{
        name: 'Proposal 1',
        description: 'Proposal description',
    }, {
        name: 'Proposal 2',
        description: 'Proposal 2 description',
    }],
    staked: 0,
}, {
    name: 'My DAO 456',
    description: 'My DAO description 456',
    proposals: [{
        name: 'Proposal 1',
        description: 'Proposal description',
    }, {
        name: 'Proposal 2',
        description: 'Proposal 2 description',
    }],
    staked: 0,
}];

type Props = {
    name: string,
    description: string,
    proposals: {
        name: string,
        description: string,
    }[],
    staked: number,
};

const styles = StyleSheet.create({
    daoList: {
        padding: 10,
        height: '100%',
        backgroundColor: '#2F373B',
    },
    daoListItemText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 600,
    },
    daoListItem: {
        padding: 14,
        backgroundColor: '#202023',
        marginVertical: 6,
        borderRadius: 6,
    },
    daoListItemHeading: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        gap: 10,
        marginBottom: 5,
    },
    daoListItemBlock: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
});

const DaoListItemView = (props: Props) => {
    const { push } = useRouter();
    
    return (
        <View style={styles.daoListItem}>
            <View style={styles.daoListItemHeading}>
                <Image source={require('../assets/images/dao-icon.png')} style={{
                    width: 30,
                    height: 30,
                }} />
                <Text style={styles.daoListItemText}>{props.name}</Text>
            </View>
            <View>
                <View style={styles.daoListItemBlock}>
                    <Text style={{
                        color: '#9EA0A8',
                    }}>Proposals</Text>
                    <Text style={{
                        color: '#2D94FF',
                    }}>{props.proposals.length}</Text>
                </View>
                <View style={styles.daoListItemBlock}>
                    <Text style={{
                        color: '#9EA0A8',
                    }}>Neurons</Text>
                    <Text style={{
                        color: '#2D94FF',
                    }} onPress={() => {
                        // todo: open stake modal
                    }}>Stake ICP</Text>
                    {props.staked > 0 && (
                        <Text style={{
                            color: '#2D94FF',
                        }}>{props.staked}</Text>
                    )}
                </View>
                <View>
                    <Button
                        title='View DAO details'
                        onPress={() => {
                            push({
                                pathname: '/(tabs)/[dao]',
                                params: { dao: props.name },
                            })
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export const DaoListView = () => {
    return (
         <SafeAreaProvider>
            <SafeAreaView style={commonStyles.pageContainer}>
                <View style={commonStyles.pageHeadingContainer}>
                    <Text style={commonStyles.pageHeadingText}>List of DAOs</Text>
                </View>
                <FlatList
                    data={daosMock}
                    style={styles.daoList}
                    renderItem={({ item }) => <DaoListItemView key={item.name} {...item} />}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};
