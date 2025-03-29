import { useLocalSearchParams } from 'expo-router';
import { DaoDetailsView } from '../../components/DaoDetailsView';
import { daosMock } from '@/components/DaoListView';

const DaoDetailsPage = () => {
    const { dao } = useLocalSearchParams();

    const daoItem = daosMock.filter(_dao => _dao.name === dao)[0];

    return (
        <DaoDetailsView {...daoItem} />
    );
};

export default DaoDetailsPage;
