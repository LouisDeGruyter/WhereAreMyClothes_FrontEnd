import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Layout } from 'antd';
import { useMemo } from 'react';

const { Content, Header } = Layout;

export default memo(function Home(){
const navigate = useNavigate();
const header = useMemo (() => {
    return {backgroundColor:"white"};
},[]);

    return (
        <Layout>
            <Header style={header}>
                <h1>Welkom bij WhereAreMyClothes</h1>
            </Header>
            <Content>

                <h2>Welkom</h2>
            <p>Met onze website kunt u eenvoudig uw kleding bijhouden en precies weten welke kledingkast ze bevinden.</p>
            <h3>Bekijk uw kleding</h3>
            <p>Klik op de onderstaande knop om alle kleding en de kledingkast waar ze zich bevinden te bekijken.</p>
            <Button onClick={()=> {navigate(`/kleren`)}}>Bekijk kleding</Button>
            <h3>Voeg kleding toe aan uw kledingkast</h3>
            <p>Klik op de onderstaande knop om kleding toe te voegen aan uw kledingkast.</p>
            <Button onClick={()=> {navigate("/kleren/add")}}>Voeg kleding toe</Button>
            <h3>Bekijk uw kledingkasten</h3>
            <p>Klik op de onderstaande knop om alle van uw kledingkasten te bekijken.</p>
            <Button onClick={()=> {navigate(`/kleerkasten`)}}>Bekijk kledingkasten</Button>
            <h3>Voeg een kledingkast toe</h3>
            <p>Klik op de onderstaande knop om een kledingkast toe te voegen.</p>
            <Button onClick={()=> {navigate(`/kleerkasten/add`)}}>Voeg kledingkast toe</Button>
            
                

            </Content>
        </Layout>
    );

})