import { memo, useEffect,useState} from 'react';
import * as kledingstukApi from '../../api/kledingstukken';
import { useParams } from 'react-router-dom';

export default memo( function Kledingstuk() {
    const [kledingstuk, setKledingstuk] = useState({});
    const { id } = useParams();
    useEffect(() => {
        const fetchKledingstuk = async () => {
          const kledingstuk = await kledingstukApi.getKledingstukById(id);
          setKledingstuk(kledingstuk);
        };
        fetchKledingstuk();
      }, []);

    return (
        <div >
        {kledingstuk.color} {kledingstuk.type} maat: {kledingstuk.size}
        </div>
    );
    });
