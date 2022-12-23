
import { useNavigate, useParams } from 'react-router-dom';
import Error from '../Error';
import useKleerkasten from '../../api/kleerkasten';
import useUsers from '../../api/users';
import { Table, notification, Spin, Alert, Input, Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState, useMemo } from 'react';
import KledingTable from '../kleren/KledingTable';
import useKledingstukken from '../../api/kledingstukken';

export default function Kleerkastenlijst() {
  const kleerkastApi = useKleerkasten();
  const kledingstukApi = useKledingstukken();
  const userApi = useUsers();
  const [kleerkasten, setKleerkasten] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [text, setText] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotification = useCallback((item) => {
    api['success']({
      message: `${item} is succesvol verwijderd`,
      placement: 'topRight',
      duration: 3,

    });
  }, [api]);

  const getFilterTekst = useCallback((text) => {
    if (!text) {
      return;
    }

    return `Zoekopdracht: ${text}`;
  }, []);
  const styles = useMemo(() => ({
    delete: {
      color: 'red',
      marginLeft: 12,
    },
    header: {
      backgroundColor: '#fff',
    },
    search: {
      marginBottom: 15, width: "50%",
    },
    newButton: {
      color: "white",
      backgroundColor: "#181649",
      width: "50%",
      marginBottom: 8,

    },
    filtertekst: {
      clear: "both", marginBottom: 10,
    },
    table: {
      marginLeft: "auto", marginRight: "auto", width: "90%", border: "2px solid #020034",
      borderRadius: 8,
      height: "100%",
      backgroundColor: "white",
    }
  }), []);


  const handleEdit = useCallback((id) => {
    navigate(`/kleerkasten/${id}/edit`);
  }, [navigate]);

  const filteredItems = useMemo(() => {
    if (!query) {
      return kleerkasten;
    }
    return kleerkasten.filter((kleerkast) => `${kleerkast.name} ${kleerkast.location} ${kleerkast.kledingstukken.length}`.toLowerCase().includes(query.toLowerCase()))
  }, [query, kleerkasten]);
  const columns = [
    {
      title: "Naam",
      dataIndex: "name",
      key: "name",
      align: "center",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Locatie",
      dataIndex: "location",
      align: "center",
      key: "location",
      sorter: (a, b) => a.location.localeCompare(b.location),
    },
    {
      title: "Aantal kledingstukken",
      dataIndex: "aantalKledingstukken",
      align: "center",
      key: "aantalKledingstukken",
      sorter: (a, b) => a.aantalKledingstukken - b.aantalKledingstukken,
    },
    {
      title: 'Bewerk of verwijder',
      dataIndex: 'kleerkastId',
      align: "center",
      render: (id) => (
        <div onClick={(event) => event.stopPropagation()}>
          <EditOutlined onClick={() => handleEdit(id)} />
          <DeleteOutlined onClick={() => { onDelete(id) }} style={styles.delete} data-cy="remove_kleerkast" />
        </div>
      ),
    },

  ];
  const dataSource = filteredItems.map((kleerkast) => {
    return {
      ...kleerkast, aantalKledingstukken: kleerkast.kledingstukken.length
    };
  });
  const refreshKleerkasten = useCallback(async () => {
    try {
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
          setKleerkasten(oldKleerkasten => oldKleerkasten.filter(({ kleerkastId }) => kleerkastId !== idToDelete));
          openNotification("Kleerkast");
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      },
    });
  }, [kleerkastApi, openNotification]);
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
              kledingstukken: kleerkast.kledingstukken.filter(({ kledingstukId }) => kledingstukId !== idToDelete)
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
  }, [kledingstukApi, openNotification]);
  
  const handleNewKleerkast = useCallback(() => {
    navigate(`/kleerkasten/add`);
  }, [navigate]);


  return (
    <div className="justify-content-center">
      {contextHolder}
      <Spin spinning={loading}>


        <h1>Kleerkastenlijst</h1>

        <div>
          <Input.Search
            placeholder="Zoek hier..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onSearch={(e) => setText(query)}
            style={styles.search}
          />
          <br />
          <Button style={styles.newButton} onClick={handleNewKleerkast}>
            Voeg kleerkast toe
          </Button>
        </div>
        <div style={styles.filtertekst}>{getFilterTekst(text)}</div>
        <Error error={error} />
        <Table data-cy="kledinglijst" onRow={OnRow} locale={loading ? { emptyText: "Loading" } : { emptyText: <Alert message="Er zijn nog geen kleerkasten, klik op de bovenstaande knop om er toe te voegen" type="warning" showIcon closable /> }}
          columns={columns}
          dataSource={dataSource}
          rowKey="kleerkastId"
          scroll={{ x: 768, y: "57vh" }}
          pagination={{ showTotal: (total, range) => `${range[0]}-${range[1]} van ${total} kleerkasten`, pageSizeOptions: ['1', '2', '3', '5', '10', '25', '50', '100', '200'], position: ['bottomCenter'], showSizeChanger: true, defaultPageSize: 10, showQuickJumper: true, }}
          style={styles.table}
          expandable={{ rowExpandable: record => record.kledingstukken.length && record.kledingstukken.length > 0 }}
          expandedRowRender={record => <KledingTable kledingstukken={record.kledingstukken} loading={loading} onDelete={onDeleteKledingstuk} kleerkasten={kleerkasten} />}
        >

        </Table>
      </Spin>
    </div>
  );
}




