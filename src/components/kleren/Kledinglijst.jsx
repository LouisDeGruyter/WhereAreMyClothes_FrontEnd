import { useState, useMemo, useCallback, memo, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Layout,Spin, Modal} from 'antd';
import useKledingstukken  from '../../api/kledingstukken';
import Error from '../Error';
import {notification} from 'antd';
import KledingTable from './KledingTable';
import useKleerkasten from '../../api/kleerkasten';
import useUsers from '../../api/users';

const { Header, Content } = Layout;



const getFilterTekst = (text) => {
  if (!text) {
    return;
  }

  return `Zoekopdracht: ${text}`;
};

export default memo( function Kledinglijst() {
  const kledingstukApi= useKledingstukken();
  const userApi = useUsers();
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [kledingstukken, setKledingstukken] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [kleerkasten, setKleerkasten] = useState([]);
  const kleerkastApi = useKleerkasten();
  const openNotification = () => {
    api['success']({
        message: 'Kledingstuk is succesvol verwijderd',
          placement: 'topRight',
          duration: 3,

          });
};
const refreshKledingstukken = useCallback(async () => {
  try{
    setLoading(true);
    setError(null);
  const kledingstukken = await userApi.getKledingstukken();
  setKledingstukken(kledingstukken);
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
}, []);
  useEffect(() => {
    const fetchKleerkasten = async () => {
    try{
      setLoading(true);
      setError(null);
    const kleerkasten = await kleerkastApi.getAll();
    setKleerkasten(kleerkasten);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  fetchKleerkasten();
    refreshKledingstukken();
    
  }, [refreshKledingstukken]);
  
  const onDelete = useCallback(async (idToDelete) => {
    Modal.confirm({
      title: 'Weet je zeker dat je dit kledingstuk wilt verwijderen?',
      content: 'Dit kan niet ongedaan worden gemaakt',
      okText: 'Ja',
      okType: 'danger',
      cancelText: 'Nee',
      onOk: async () => {
        try {
          setLoading(true);
          setError(null);
          kledingstukApi.deleteKledingstuk(idToDelete);
          setKledingstukken(oldKledingstukken => oldKledingstukken.filter(({kledingstukId}) => kledingstukId !== idToDelete));
          openNotification();
    
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      },
    });
  }, []);
  

  const filteredItems = useMemo(() => {
    if (!query) {
      return kledingstukken;
    }
    return kledingstukken.filter((kledingstuk) =>  `${kledingstuk.brand} ${kledingstuk.color} ${kledingstuk.type} ${kledingstuk.size} ${kledingstuk.kleerkastId}`.toLowerCase().includes(query.toLowerCase()));
  }, [query, kledingstukken]);
  const dataSource = useMemo(() =>
  kleerkasten.length === 0 ? [] :
    filteredItems.map((kledingstuk) => ({ kleerkastLocatie: kleerkasten.find(({kleerkastId}) => kleerkastId === kledingstuk.kleerkastId).location, kleerkastNaam: kleerkasten.find(({kleerkastId}) => kleerkastId === kledingstuk.kleerkastId).name , ...kledingstuk }))
  , [filteredItems, kleerkasten]);
  const handleSearch= useCallback((e) => {
    setText(query);
  }, [query]);
  const handleChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);
  const handleNewKledingstuk = useCallback(() => {
    navigate(`/kleren/add`);
  }, []);
  return (
    <div className="justify-content-center">
      <Spin spinning={loading} size="large"  data-cy="loading" >
      {contextHolder}
      <Layout>
        <Header style={{backgroundColor:"white"}}>
          <h1>Kledinglijst</h1>
        </Header>
        <Content style={{backgroundColor:"white"}}>
      <div>
        <Input.Search
          placeholder="Zoek hier..."
          value={query}
          onChange={handleChange}
          onSearch={handleSearch}
          style={{ marginBottom: 8, width: "50%", display: "inline-block", marginLeft: "2.5%", float:"left" }}
        />
        <Button style={{ float: "right", marginRight: "2.5%" }} onClick={handleNewKledingstuk}>
          Klik hier om een nieuw kledingstuk toe te voegen
        </Button>
        <div>{getFilterTekst(text)}</div>
        <Error error={error}/>
    <KledingTable kledingstukken={dataSource} onDelete={onDelete} loading={loading} />
   
     </div>
      </Content>
      </Layout>
      </Spin>
    </div>
    );

});