import { useState, useMemo, useCallback, memo, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Input } from 'antd';
import * as kledingstukApi from '../../api/kledingstukken';

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

export default memo (function Kledinglijst() {
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [kledingstukken, setKledingstukken] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchKledingstukken = async () => {
      const kledingstukken = await kledingstukApi.getAll();
      setKledingstukken(kledingstukken);
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
  const filteredItems = useMemo(() => getFilteredItems(query, kledingstukken), [query, kledingstukken]);
  return (
    <div className="justify-content-center">
      <h2>Kleren in de kast</h2>
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
        <Table onRow={memoizedOnRow}
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
    
    // {(record, rowIndex) => {
    //     return {
    //        
    //     };
    // }}

    style={{marginLeft:30, marginRight:30}}
    ></Table>
   
     </div>
    </div>
    );

});