import { memo,useCallback } from "react"
import { useNavigate } from "react-router-dom"
import {Table, Alert} from "antd"
import {EditOutlined, DeleteOutlined} from "@ant-design/icons"


export default memo(function  KledingTable({kledingstukken,loading,onDelete,kleerkasten}) {
    const navigate = useNavigate()
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
      const columns = [
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
];
if(kleerkasten===true){
    columns.push({
        title: 'KleerkastNummer',
        dataIndex: 'kleerkastId',
        width:"16%",
        sorter: (a, b) => a.kleerkastId - b.kleerkastId,
    })
}
columns.push({title: '',
dataIndex: 'kledingstukId',
render: (id) => (
    <div onClick={(event)=> event.stopPropagation()}>
       <EditOutlined onClick={()=> {navigate(`/kleren/${id}/edit`)}}/>
        <DeleteOutlined onClick={()=> {onDelete(id)}} style={{color:"red", marginLeft:12}} data-cy="remove_kledingstuk"/>
    </div>
),});

      
return (
<Table data-cy="kledinglijst" onRow={OnRow} locale= {loading?{emptyText:"Loading"}:{emptyText:<Alert message="Er zijn nog geen kledingstukken, klik op de bovenstaande knop om er toe te voegen" type="warning" showIcon closable/>}}
          columns={columns}
    dataSource={kledingstukken}
    rowKey="kledingstukId"
    style={{marginLeft:30, marginRight:30, width:"95%"}}
    ></Table>
)
});