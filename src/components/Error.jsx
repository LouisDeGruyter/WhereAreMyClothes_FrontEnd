import {Alert} from 'antd';
export default function Error({error}) {
    if(error) {
    return (
        <Alert type="error" message={error.message || JSON.stringify(error)} banner />
    );
}
return null;
}