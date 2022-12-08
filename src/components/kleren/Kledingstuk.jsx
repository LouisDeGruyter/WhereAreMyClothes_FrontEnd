import { memo, useEffect,useState} from 'react';
import * as kledingstukApi from '../../api/kledingstukken';
import { useParams } from 'react-router-dom';
import Error from '../Error';

export default  function Kledingstuk() {
    const [kledingstuk, setKledingstuk] = useState({});
    const [error, setError] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        const fetchKledingstuk = async () => {
            try{
          const kledingstuk = await kledingstukApi.getKledingstukById(id);
          setKledingstuk(kledingstuk);
            } catch (error) {
                setError(error);
            }
            
        };
        fetchKledingstuk();
      }, []);

    return (
        <div >
            <Error error={error}/>
        {kledingstuk.color} {kledingstuk.type} maat: {kledingstuk.size}
        </div>
    );
    };
