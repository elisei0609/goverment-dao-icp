import { ScrollView, FlatList, View, Text, Image, StyleSheet } from 'react-native';

type Props = {
    name: string,
    description: string,
    proposals: string[],
};

const DaoProposalView = () => {
    return (
        <View>
            <Text>proposal</Text>
            <Text>proposal</Text>
            <Text>proposal</Text>
        </View>
    );
};

export const DaoDetailsView = (props: Props) => {
    return (
        <View>
            <View>
                <Image src={require('../assets/images/dao-icon.png')}/>
                <Text>{props.name}</Text>
            </View>
            <FlatList
                data={props.proposals}
                renderItem={({ item }) => <DaoProposalView key={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({ });
