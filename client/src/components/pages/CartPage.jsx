import { Button, Card, message, Table, Popconfirm, Space, Input, Spin } from "antd";
import { useRef, useState } from "react";
import CreateBill from "../cart/CreateBill";
import Header from "../header/Header";
import { PlusOutlined, MinusOutlined, SearchOutlined } from "@ant-design/icons"
import { useSelector, useDispatch } from "react-redux";
import { decrease, deleteProduct, increase } from "../../redux/cartSlice";
import Highlighter from 'react-highlight-words';


const CartPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => (state.cart))
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Product Image",
      dataIndex: "img",
      key: "img",
      width: "125px",
      render: (text) => {
        return (<img src={text} className="h-16 w-16  rounded-lg" />)
      }
    },
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title")
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category")
    },
    {
      title: "Product Price",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return (<span>$ {text.toFixed(2)}</span>)
      },
      sorter: (a,b) => a.price - b.price,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return (
          <div className="flex items-center">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="flex justify-center items-center !rounded-full"
              size="small"
              onClick={() => (dispatch(increase(record)))}
            />

            <span className="font-semibold w-6 inline-block text-center ">{record.quantity}</span>
            <Button
              type="primary"
              icon={<MinusOutlined />}
              className="flex justify-center items-center !rounded-full"
              size="small"
              onClick={() => {
                if (record.quantity === 1) {
                  if (window.confirm("Are you sure you want to delete item?")) {
                    dispatch(decrease(record))
                    message.success("Item deleted successfully!")
                  }
                }
                else {
                  dispatch(decrease(record))
                }
              }}
            />
          </div>
        )
      }
    },
    {
      title: "Total Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => {
        return (<span>$ {(record.quantity * record.price.toFixed(2))}</span>)
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Popconfirm
            onConfirm={() => {
              dispatch(deleteProduct(record))
              message.success("Product removed successfully!")
            }}
            title="Do you want to delete item?"
            okText="Yes"
            cancelText="No"
            placement="topRight"
          >
            <Button type="link" className="text-[15px]" danger >Delete</Button>

          </Popconfirm>
        )
      }

    },
  ];

  return (
    <>
      <div className="overflow-auto max-h-[100vh]">
        <Header />
          <div className="px-6 ">
          <Table 
          dataSource={cart.cartItems} 
          columns={columns} 
          bordered pagination={false}
          scroll={{
            x: 1200,
            y: 600
          }}
          />
        </div>
       
        <div className="cart-item flex justify-end px-6 mt-4">
          <Card
            size="medium"
            className="w-72"
          >
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>$ {(cart.total > 0) ? cart.total.toFixed(2) : 0}</span>
            </div>

            <div className="flex justify-between my-2">
              <span>KDV %8 Toplam</span>
              <span className="text-red-700">{(cart.total > 0) ? `+ $ ${(cart.total * cart.tax).toFixed(2)}` : 0}</span>
            </div>

            <div className="flex justify-between">
              <b>Genel Toplam</b>
              <span className="text-xl">$ {(cart.total > 0) ? ` ${(cart.total * (1 + cart.tax)).toFixed(2)}` : 0}</span>
            </div>

            <Button className="w-full mt-4"
             type="primary" size="large"
             onClick={() => setIsModalOpen(true)}
             disabled={cart.cartItems.length === 0}
             >Siparis Olustur</Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default CartPage;
