import { FlatList, View, Text, Image, StyleSheet, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { commonStyles } from '@/constants/theme';

type Props = {
    name: string,
    description: string,
    proposals: ProposalProps[],
};

type ProposalProps = {
    description: string,
    name: string,
};

const DaoProposalView = (props: ProposalProps) => {
    return (
        <View style={styles.daoProposalItem}>
            <View>
                <Text style={styles.daoProposalItemHeadingText}>{props.name}</Text>
                <Text style={styles.daoProposalItemDescriptionText}>{props.description}</Text>
                <View style={commonStyles.defaultButton}>
                    <Button
                        title="Show more"
                        onPress={() => {
                            //
                        }}
                        color="#fff"
                    />
                </View>
            </View>
            <View>
                <View style={styles.daoProposalTimingContainer}>
                    <Text style={styles.daoProposalItemHeadingText}>Voting</Text>
                    <Text style={styles.daoProposalItemDescriptionText}>Time Left: 0:00</Text>
                </View>
                <View style={styles.daoProposalActionsContainer}>
                    <View style={styles.daoProposalVoteUpAction}>
                        <Button
                            title="Vote adopt"
                            onPress={() => {
                                // todo
                            }}
                            color="#fff"
                        />
                    </View>
                    <View style={styles.daoProposalVoteDownAction}>
                        <Button
                            title="Vote reject"
                            onPress={() => {
                                // todo
                            }}
                            color="#fff"
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export const DaoDetailsView = (props: Props) => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={commonStyles.pageContainer}>
                <View style={{ ...commonStyles.pageHeadingContainer, gap: 20 }}>
                    <Image source={require('../assets/images/dao-icon.png')} style={{
                        width: 30,
                        height: 30,
                    }} />
                    <Text style={commonStyles.pageHeadingText}>{props.name}</Text>
                </View>
                <FlatList
                    data={props.proposals}
                    contentContainerStyle={{
                        gap: 20,
                    }}
                    renderItem={({ item }) => <DaoProposalView {...item} />}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        height: '100%',
        backgroundColor: '#202023',
    },
    daoProposalTimingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    daoProposalActionsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    daoProposalItem: {
        padding: 12,
        backgroundColor: '#292A2F',
        borderRadius: 6,
    },
    daoProposalItemHeadingText: {
        fontSize: 18,
        fontWeight: 600,
        color: '#fff',
        marginBottom: 10,
    },
    daoProposalItemDescriptionText: {
        fontSize: 14,
        color: '#9EA0A8',
    },
    daoProposalVoteUpAction: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'red',
        paddingHorizontal: 16,
    },
    daoProposalVoteDownAction: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'limegreen',
        paddingHorizontal: 16,
    },
});
