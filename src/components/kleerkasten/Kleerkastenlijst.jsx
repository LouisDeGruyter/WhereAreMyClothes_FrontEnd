
import { useNavigate, useParams  } from 'react-router-dom';
import Error from '../Error';
import useKleerkasten from '../../api/kleerkasten';
import useUsers from '../../api/users';
import { Layout,Table, notification,Spin,Alert,Input,Button,Modal} from 'antd';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';
import { useCallback, useEffect, useState, useMemo } from 'react';
import KledingTable from '../kleren/KledingTable';
import useKledingstukken from '../../api/kledingstukken';
import './kleerkastenlijst.css'

const { Header, Content } = Layout;



const getFilterTekst = (text) => {
    if (!text) {
      return;
    }
  
    return `Zoekopdracht: ${text}`;
  };


export default function Kleerkastenlijst(){
    const kleerkastApi = useKleerkasten();
    const kledingstukApi = useKledingstukken();
    const userApi = useUsers();
    const [kleerkasten, setKleerkasten] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [text, setText] = useState("");
    const [api, contextHolder] = notification.useNotification();
    const navigate= useNavigate();

    const handleEdit = useCallback((id) => {
        navigate(`/kleerkasten/${id}/edit`);
      }, []);

    const filteredItems = useMemo(() => {
        if (!query) {
          return kleerkasten;
        }
        return kleerkasten.filter((kleerkast) =>  `${kleerkast.name} ${kleerkast.location} ${kleerkast.kledingstukken.length}`.toLowerCase().includes(query.toLowerCase()))
      }, [query, kleerkasten]);
    const columns = [
        {
            title: "Naam",
            dataIndex: "name",
            key: "name",
            align:"center",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Locatie",
            dataIndex: "location",
            align:"center",
            key: "location",
            sorter: (a, b) => a.location.localeCompare(b.location),
        },
        {
            title: "Aantal kledingstukken",
            dataIndex: "aantalKledingstukken",
            align:"center",
            key: "aantalKledingstukken",
            sorter: (a, b) => a.aantalKledingstukken - b.aantalKledingstukken,
        },
        {
            title: 'Bewerk of verwijder',
            dataIndex: 'kleerkastId',
            align:"center",
            render: (id) => (
                <div onClick={(event)=> event.stopPropagation()}>
                   <EditOutlined onClick={()=>handleEdit(id)}/>
                    <DeleteOutlined onClick={()=> {onDelete(id)}} style={{color:"red", marginLeft:12}} data-cy="remove_kleerkast"/>
                </div>
            ),
        },
                
    ];
    const dataSource= filteredItems.map((kleerkast) => {
        return {
            ...kleerkast, aantalKledingstukken: kleerkast.kledingstukken.length
            };
            });
    const refreshKleerkasten = useCallback(async () => {
        try{
            setLoading(true);
            setError(null);
            const kleerkasten = await userApi.getKleerkasten();
            setKleerkasten(kleerkasten);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        refreshKleerkasten();
        }, [refreshKleerkasten]);
    const OnRow = (record) => {
        return {
            onClick: event => {
                          navigate(`/kleerkasten/${record.kleerkastId}`);
                          event.stopPropagation();
                      },
                      onMouseEnter: event => {
                          event.target.style.cursor = "pointer";
                          event.target.title = "Klik om kleerkast met id " + record.kleerkastId + " te bekijken";
                          event.stopPropagation();
          
                      },
          };
    }
    
      const onDelete = useCallback(async (idToDelete) => {
        Modal.confirm({
          title: 'Weet je zeker dat je deze kleerkast wilt verwijderen?',
          content: 'Dit kan niet ongedaan worden gemaakt alle kledingstukken die zich in de kleerkast bevinden worden ook verwijderd',
          okText: 'Ja',
          okType: 'danger',
          cancelText: 'Nee',
          onOk: async () => {
            try {
              setLoading(true);
              setError(null);
              kleerkastApi.deleteKleerkast(idToDelete);
              setKleerkasten(oldKleerkasten => oldKleerkasten.filter(({kleerkastId}) => kleerkastId !== idToDelete));
              openNotification("Kleerkast");
            } catch (error) {
              setError(error);
            } finally {
              setLoading(false);
            }
          },
        });
      }, []);
      const onDeleteKledingstuk = useCallback(async (idToDelete) => {
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
                    setKleerkasten(oldKleerkasten => oldKleerkasten.map(kleerkast => {
                        return {
                          ...kleerkast,
                          kledingstukken: kleerkast.kledingstukken.filter(({kledingstukId}) => kledingstukId !== idToDelete)
                        };
                      }));
                    openNotification("Kledingstuk");
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            },
        });
    }, []);
      const openNotification = (item) => {
        api['success']({
            message: `${item} is succesvol verwijderd`,
              placement: 'topRight',
              duration: 3,
    
              });
    };
    const handleNewKleerkast = useCallback(() => {
      navigate(`/kleerkasten/add`);
    }, []);

      
    return(
        <div className="justify-content-center">
            {contextHolder}
            <Spin spinning={loading}>
            <Layout>
                <Header style={{backgroundColor:"white"}}>
            <h1>Kleerkastenlijst</h1>
            </Header>
            <Content>
            <Input.Search
          placeholder="Zoek hier..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={(e) => setText(query)}
          style={{ marginBottom: 8, width: "50%",float:"left", marginLeft:"2.5%"}}
        />
        <Button style={{ float: "right", marginRight: "2.5%" }} onClick={handleNewKleerkast}>
          Klik hier om een nieuwe kleerkast toe te voegen
        </Button>
        
        <div>{getFilterTekst(text)}</div>
            <Error error={error} />
            <Table data-cy="kledinglijst" onRow={OnRow} locale= {loading?{emptyText:"Loading"}:{emptyText:<Alert message="Er zijn nog geen kleerkasten, klik op de bovenstaande knop om er toe te voegen" type="warning" showIcon closable/>}}
            columns= {columns}
            dataSource={dataSource}
            rowKey="kleerkastId"
                style={{marginLeft:"auto", marginRight:"auto", width:"95%"}}
                expandable={{ rowExpandable: record => record.kledingstukken.length && record.kledingstukken.length > 0}}
                expandedRowRender={record => <KledingTable kledingstukken={record.kledingstukken} loading={loading} onDelete={onDeleteKledingstuk} kleerkasten={kleerkasten} />}
            >
                

            </Table>

            </Content>
            </Layout>
            </Spin>
        </div>
    );
}

    

  
