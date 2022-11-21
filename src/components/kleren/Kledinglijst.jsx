import { useState, useMemo, useCallback, useEffect } from 'react';
import Kledingstuk from "./Kledingstuk";
import { KLEDING_DATA } from '../../api/mock_data';
import { MDBContainer } from "mdb-react-ui-kit";

const getFilteredItems = (query,items) => {
    if (!query) 
       { return items;
    }
    return items.filter((kledingstuk) =>  `${kledingstuk.color} ${kledingstuk.type} maat: ${kledingstuk.size}`.toLowerCase().includes(query.toLowerCase()));
}

export default function Kledinglijst(){
    const [text, setText] = useState('');
    const [query, setQuery] = useState('');

    
   const filteredItems = useMemo(() => getFilteredItems(query, KLEDING_DATA), [query, KLEDING_DATA]);
    return(
    <div className="justify-content-center">
        
        <div className='input-group mb-3 w-50 mx-auto'>
    <input type="search" id="search-focus" className="form-control rounded" placeholder="Search here..." value={text} onChange={(e) => setText(e.target.value)} data-cy="Kledinglijst_search_input" />
    <button type="button" className="btn btn-outline-primary" onClick={() => setQuery(text)} data-cy="transactions_search_btn"><i className="fas fa-search"></i></button>
    </div>
   
    
    <h2>Kleren in de kast</h2>
     <div>
        {filteredItems.map((value) => (
            <Kledingstuk key={value.id} {...value} />
        ))}
     </div>
    </div>
    );

}