import useKledingstukken from '../../api/kledingstukken';

export default function Kleerkastenlijst(){
    const kledingApi = useKledingstukken();
    kledingApi.getAll();
    return;
}