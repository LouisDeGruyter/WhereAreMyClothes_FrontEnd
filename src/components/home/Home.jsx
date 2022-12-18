import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Layout } from 'antd';
import { useMemo } from 'react';

const { Content, Header } = Layout;

export default memo(function Home(){
const navigate = useNavigate();

 const handleKleren = useCallback(() => {
    navigate('/kleren');
    }, [navigate]);
    const handleKleerkasten = useCallback(() => {
        navigate('/kleerkasten');
        }, [navigate]);
    const handleKleerkastenAdd = useCallback(() => {
        navigate('/kleerkasten/add');
        }, [navigate]);
    const handleKlerenAdd = useCallback(() => {
        navigate('/kleren/add');
        }, [navigate]);
const styles = useMemo(() => ({
    layout: {
        backgroundColor:"white",
    },
    button: {
        marginBottom: "10px",
        color: "white",
        backgroundColor: "#181649",
    },
}), []);

    return (
        <Layout>
            <Header style={styles.layout}>
                <h1>Welkom bij WhereAreMyClothes</h1>
            </Header>
            <Content style={styles.layout}>
            <p>Met onze website kunt u eenvoudig uw kleding bijhouden en precies weten welke kledingkast ze bevinden.</p>
            <h3>Bekijk uw kleding</h3>
            <p>Klik op de onderstaande knop om alle kleding en de kledingkast waar ze zich bevinden te bekijken.</p>
            <Button onClick={handleKleren} style={styles.button}>Bekijk kleding</Button>
            <h3>Voeg kleding toe aan uw kledingkast</h3>
            <p>Klik op de onderstaande knop om kleding toe te voegen aan uw kledingkast.</p>
            <Button onClick={handleKlerenAdd} style={styles.button}>Voeg kleding toe</Button>
            <h3>Bekijk uw kledingkasten</h3>
            <p>Klik op de onderstaande knop om alle van uw kledingkasten te bekijken.</p>
            <Button onClick={handleKleerkasten} style={styles.button}>Bekijk kledingkasten</Button>
            <h3>Voeg een kledingkast toe</h3>
            <p>Klik op de onderstaande knop om een kledingkast toe te voegen.</p>
            <Button onClick={handleKleerkastenAdd} style={styles.button}>Voeg kledingkast toe</Button>
            
                

            </Content>
        </Layout>
    );

})