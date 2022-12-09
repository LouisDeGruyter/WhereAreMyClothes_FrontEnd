import { useState, useMemo, useCallback, memo, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Input, Alert, Layout} from 'antd';
import * as kledingstukApi from '../../api/kledingstukken';
import Error from '../Error';
const { Header, Content } = Layout;
const getFilteredItems = (query, items) => {
  if (!query) {
    return items;
  }

  return items.filter((kledingstuk) =>  `${kledingstuk.brand} ${kledingstuk.color} ${kledingstuk.type} ${kledingstuk.size} ${kledingstuk.kleerkastId}`.toLowerCase().includes(query.toLowerCase()));
};

const getFilterTekst = (text) => {
  if (!text) {
    return;
  }

  return `Zoekopdracht: ${text}`;
};

export default function Kledinglijst() {
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [kledingstukken, setKledingstukken] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  useEffect(() => {

    const fetchKledingstukken = async () => {
      try{
        setError(null);
      const kledingstukken = await kledingstukApi.getAll();
      setKledingstukken(kledingstukken);
      } catch (error) {
        setError(error);
      }
      
    };
    fetchKledingstukken();
 

  }, []);

  const memoizedOnRow = useCallback((record, rowIndex) => {
    return {
      onClick: event => {
                    navigate(`/kleren/${record.kledingstukId}`);
                    event.stopPropagation();
                },
                onMouseEnter: event => {
                    event.target.style.cursor = "pointer";
                    event.target.title = "Klik om kledingstuk met id " + record.id + " te bekijken";
                    event.stopPropagation();
    
                },
    };
  }, []);
  const filteredItems = useMemo(() => getFilteredItems(text, kledingstukken), [text, kledingstukken]);
  return (
    <div className="justify-content-center">
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
        <Button style={{ float: "right", marginRight: 30 }} onClick={() => { navigate(`/kleren/add`) }}>
          Klik hier om een nieuw kledingstuk toe te voegen
        </Button>
        <div>{getFilterTekst(text)}</div>
        <Error error={error}/>
        <Table onRow={memoizedOnRow} locale={{emptyText:<Alert message="Er zijn nog geen kledingstukken, klik op de bovenstaande knop om er toe te voegen" type="warning" showIcon closable/>}}
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
                </div>
            ),
        },
    ]}
    dataSource={filteredItems}
    rowKey="kledingstukId"
    style={{marginLeft:30, marginRight:30}}
    ></Table>
   
     </div>
      </Content>
      </Layout>
    </div>
    );

};