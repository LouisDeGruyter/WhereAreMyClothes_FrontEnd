import { useState, useMemo, useCallback, memo, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Input, Alert, Layout,Spin} from 'antd';
import * as kledingstukApi from '../../api/kledingstukken';
import Error from '../Error';
import {notification} from 'antd';
import { Tab } from 'bootstrap';
const { Header, Content } = Layout;



const getFilterTekst = (text) => {
  if (!text) {
    return;
  }

  return `Zoekopdracht: ${text}`;
};

export default memo( function Kledinglijst() {
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [kledingstukken, setKledingstukken] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
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
  const kledingstukken = await kledingstukApi.getAll();
  setKledingstukken(kledingstukken);
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
}, []);
  useEffect(() => {
 
    refreshKledingstukken();
    
  }, [refreshKledingstukken]);
  
  const onDelete = useCallback(async (idToDelete) => {
    
    try {
      setLoading(true);
      setError(null);
      await kledingstukApi.deleteKledingstuk(idToDelete);
      setKledingstukken(oldKledingstukken => oldKledingstukken.filter(({kledingstukId}) => kledingstukId !== idToDelete));
      openNotification();

    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);
  


  const OnRow = useCallback((record, rowIndex) => {
    return {
      onClick: event => {
                    navigate(`/kleren/${record.kledingstukId}`);
                    event.stopPropagation();
                },
                onMouseEnter: event => {
                    event.target.style.cursor = "pointer";
                    event.target.title = "Klik om kledingstuk met id " + record.kledingstukId + " te bekijken";
                    event.stopPropagation();
    
                },
    };
  }, []);
  const filteredItems = useMemo(() => {
    if (!query) {
      return kledingstukken;
    }
    return kledingstukken.filter((kledingstuk) =>  `${kledingstuk.brand} ${kledingstuk.color} ${kledingstuk.type} ${kledingstuk.size} ${kledingstuk.kleerkastId}`.toLowerCase().includes(query.toLowerCase()));
  }, [query, kledingstukken]);
  return (
    <div className="justify-content-center">
      <Spin spinning={loading} size="large"   >
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
          onChange={(e) => setQuery(e.target.value)}
          onSearch={(e) => setText(query)}
          style={{ marginBottom: 8, width: "50%", display: "inline-block", marginLeft: "auto", marginRight: "auto" }}
        />
        <Button style={{ float: "right", marginRight: "2.5%" }} onClick={() => { navigate(`/kleren/add`) }}>
          Klik hier om een nieuw kledingstuk toe te voegen
        </Button>
        <div>{getFilterTekst(text)}</div>
        <Error error={error}/>
        {/* If loading set locale empty otherwise set locale {{ emptyText:<Alert message="Er zijn nog geen kledingstukken, klik op de bovenstaande knop om er toe te voegen" type="warning" showIcon closable/>}} */}
        <Table onRow={OnRow} locale= {loading?{emptyText:"Loading"}:{emptyText:<Alert message="Er zijn nog geen kledingstukken, klik op de bovenstaande knop om er toe te voegen" type="warning" showIcon closable/>}}
          columns={[
            {
              title: "Merk",
              dataIndex: "brand",
              sorter: (a, b) => a.brand.localeCompare(b.brand),
                width:"16%",

            },
            {
            title: 'Kleur',
            dataIndex: 'color',
            sorter: (a, b) => a.color.localeCompare(b.color),
            width:"16%",

        },
        {
            title: 'Type',
            dataIndex: 'type',
            sorter: (a, b) => a.type.localeCompare(b.type),
            width:"16%",

        },
        {
            title: 'Maat',
            dataIndex: 'size',
            sorter: (a, b) => a.size - b.size,
            width:"16%",

        },
        {
            title: 'KleerkastNummer',
            dataIndex: 'kleerkastId',
            width:"16%",
            sorter: (a, b) => a.kleerkastId - b.kleerkastId,

        },
        {
            title: 'Acties',
            dataIndex: 'kledingstukId',
            width:"16%",
            render: (id) => (
                <div onClick={(event)=> event.stopPropagation()}>
                   
                    <Button onClick={()=> {navigate(`/kleren/${id}`)}}>
                        Bekijk kledingstuk
                    </Button>

                    <Button onClick={()=> {navigate(`/kleren/${id}/edit`)}}>
                    Bewerk
                    </Button>
                    <Button onClick={()=> {onDelete(id)}}>
                    Verwijder
                    </Button>
                </div>
            ),
        },
    ]}
    dataSource={filteredItems}
    rowKey="kledingstukId"
    style={{marginLeft:30, marginRight:30, width:"95%"}}
    ></Table>
   
     </div>
      </Content>
      </Layout>
      </Spin>
    </div>
    );

});