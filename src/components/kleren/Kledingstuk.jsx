import { memo} from 'react';
import { KLEDING_DATA } from '../../api/mock_data';
import { useParams } from 'react-router-dom';

export default memo (function Kledingstuk() {
    const { id } = useParams();
    let kledingstuk = KLEDING_DATA.find((kledingstuk) => kledingstuk.id == id);
    return (
        <div className={`bg-light border-dark mb`}>
        {kledingstuk.color} {kledingstuk.type} maat: {kledingstuk.size}
        </div>
    );
    });
