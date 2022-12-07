import * as kledingApi from '../../api/kledingstukken';
export default function Kleerkastenlijst(){
    kledingApi.getAll();
    return;
}