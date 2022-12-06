import { useState, useMemo, useCallback, useEffect } from 'react';
import Kledingstuk from "./Kledingstuk";
import { KLEDING_DATA } from '../../api/mock_data';
import {Link} from 'react-router-dom';
import  {Button,Table,Input} from 'antd'

const getFilteredItems = (query,items) => {
    if (!query) 
       { return items;
    }
    return items.filter((kledingstuk) =>  `${kledingstuk.brand} ${kledingstuk.color} ${kledingstuk.type} ${kledingstuk.size} ${kledingstuk.kleerkastId}`.toLowerCase().includes(query.toLowerCase()));
}
const getFilterTekst=(text)=>{
    if (!text)
    {return }
    return `Zoekopdracht: ${text}`
}

export default function Kledinglijst(){
    const [text, setText] = useState('');
    const [query, setQuery] = useState('');

    
   const filteredItems = useMemo(() => getFilteredItems(query, KLEDING_DATA), [query, KLEDING_DATA]);
    return(
        
    <div className="justify-content-center" >
        
    <h2>Kleren in de kast</h2>
     <div>
     
        <Input.Search placeholder="Zoek hier..." value={query} onChange={(e) => setQuery(e.target.value)} onSearch={(e)=> setText(query)} style={{marginBottom:8, width:"50%"}} />
        <Button style={{float:"right", marginRight:20}}>
            <Link to="/kleren/add"  >Voeg nieuw kledingstuk toe!</Link>
            </Button>
     <div>{getFilterTekst(text)}</div>
        <Table columns={[
            {
                title:"Merk",
                dataIndex: 'brand',
                sorter: (a, b) => a.brand.localeCompare(b.brand),
            },
            {
            title: 'Kleur',
            dataIndex: 'color',
            sorter: (a, b) => a.color.localeCompare(b.color),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            sorter: (a, b) => a.type.localeCompare(b.type),
        },
        {
            title: 'Maat',
            dataIndex: 'size',
            sorter: (a, b) => a.size - b.size,
        },
        {
            title: 'KleerkastNummer',
            dataIndex: 'kleerkastId',
            width:"20%",
            sorter: (a, b) => a.kleerkastId - b.kleerkastId,
        },
        {
            title: 'Acties',
            dataIndex: 'id',
            render: (id) => (
                <div>
                    <Button>
                    <Link to={`/kleren/${id}`}>Bekijk</Link>
                    </Button>
                    <Button>
                    <Link to={`/kleren/${id}/edit`}>Bewerk</Link>
                    </Button>
                </div>
            ),
        },
    ]}
    dataSource={filteredItems}
    ></Table>
   
     </div>
    </div>
    );

}