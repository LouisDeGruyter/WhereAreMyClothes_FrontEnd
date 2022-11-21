import { memo} from 'react';
const Kledingstuk = memo(({id,color, type, size }) => {
   
return (
    <div className={`bg-light border-dark mb`}>
    {color} {type} maat: {size}
    </div>
);
});
export default memo (function Kledingstuk({id,color, type, size }) {
    return (
        <div className={`bg-light border-dark mb`}>
        {color} {type} maat: {size}
        </div>
    );
    });
