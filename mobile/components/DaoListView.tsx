import { FlatList, View, StyleSheet, Text, Image, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { commonStyles } from '@/constants/theme';

export const daosMock = [{
    name: 'My DAO 123',
    description: 'My DAO description 123',
    proposals: [],
    staked: 0,
}, {
    name: 'My DAO 456',
    description: 'My DAO description 456',
    proposals: [],
    staked: 0,
}];

type Props = {
    name: string,
    description: string,
    proposals: string[],
    staked: number,
};

const styles = StyleSheet.create({
    daoList: {
        padding: 10,
        height: '100%',
    },
    daoListItem: {
        padding: 10,
        backgroundColor: '#202023',
        marginVertical: 6,
        borderRadius: 6,
    },
    daoListItemBlock: {
        flex: 1,
        flexDirection: 'row',
    },
});

const DaoListItemView = (props: Props) => {
    const { push } = useRouter();
    
    return (
        <View style={styles.daoListItem}>
            <View>
                <Image src={require('../assets/images/dao-icon.png')} style={{}} />
                <Text>{props.name}</Text>
            </View>
            <View>
                <View style={styles.daoListItemBlock}>
                    <Text>Proposals</Text>
                    <Text>{props.proposals.length}</Text>
                </View>
                <View style={styles.daoListItemBlock}>
                    <Text>Neurons</Text>
                    <Text>{props.staked}</Text>
                </View>
                <View>
                    <Button
                        title='View DAO'
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
        <View>
            <View style={commonStyles.pageHeadingContainer}>
               <Text style={commonStyles.pageHeadingText}>List of DAOs</Text>
            </View>
            <FlatList
                data={daosMock}
                style={styles.daoList}
                renderItem={({ item }) => <DaoListItemView key={item.name} {...item} />}
            />
        </View>
    );
};
