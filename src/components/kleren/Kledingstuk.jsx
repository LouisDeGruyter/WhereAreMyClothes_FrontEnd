import { memo} from 'react';
import { useThemeColors } from '../../contexts/Theme.context';

const Kledingstuk = memo(({color, type, size }) => {
    const { theme, oppositeTheme } = useThemeColors();
return (
    <div className={`bg-${theme} border-${oppositeTheme} mb-4`}>
    <p>${color} ${type} maat: ${size}</p>
    </div>
);
});
export default Kledingstuk;