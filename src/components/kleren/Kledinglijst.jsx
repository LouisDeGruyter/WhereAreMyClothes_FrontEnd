import { useState, useMemo, useCallback, memo, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Input, Alert, Layout,Spin, Modal} from 'antd';
import useKledingstukken  from '../../api/kledingstukken';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import Error from '../Error';
import {notification} from 'antd';

const { Header, Content } = Layout;



const getFilterTekst = (text) => {
  if (!text) {
    return;
  }

  return `Zoekopdracht: ${text}`;
};

export default memo( function Kledinglijst() {
  const kledingstukApi= useKledingstukken();
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
          await kledingstukApi.deleteKledingstuk(idToDelete);
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
        <Table data-cy="kledinglijst" onRow={OnRow} locale= {loading?{emptyText:"Loading"}:{emptyText:<Alert message="Er zijn nog geen kledingstukken, klik op de bovenstaande knop om er toe te voegen" type="warning" showIcon closable/>}}
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
            title: '',
            dataIndex: 'kledingstukId',
            render: (id) => (
                <div onClick={(event)=> event.stopPropagation()}>
                   <EditOutlined onClick={()=> {navigate(`/kleren/${id}/edit`)}}/>
                    <DeleteOutlined onClick={()=> {onDelete(id)}} style={{color:"red", marginLeft:12}} data-cy="remove_kledingstuk"/>
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