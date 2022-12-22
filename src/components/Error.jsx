import { Alert } from 'antd';
const style = {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
}
export default function Error({ error }) {
    if (error) {
        console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
            return <Alert type="error" message={error.response.data.message} banner style={style} />
        }
        else
            return (
                console.log(error),
                <Alert type="error" message={error.message || JSON.stringify(error)} banner style={style} />
            );
    }
    return null;
}