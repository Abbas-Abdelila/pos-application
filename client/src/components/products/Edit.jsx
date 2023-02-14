import { Button, Form, Input, message, Modal, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'

const Edit = () => {

    const [products, setProducts] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState([])
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]) 


    useEffect(() => {
    const getProducts = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all")
      const data = await res.json()
      setProducts(data)
      
    } catch (error) {
        console.log(error)
    }
  }

  getProducts()
  }, [])


  useEffect(() => {
    const getCategories = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/get-all")
      const data = await res.json()
      data && setCategories(data.map((item) => {
        return {...item, value:item.title}
      }))
      
    } catch (error) {
        console.log(error)
    }
  }

  getCategories()
  }, [])







    const  onFinish = (values) => {
        try {
            fetch(process.env.REACT_APP_SERVER_URL + "/api/products/update-product", {
                method: "PUT",
                body: JSON.stringify({ ...values, productId: editingItem._id }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            })
            setProducts(products.map((item) => {
                if(item._id === editingItem._id) {
                    return values
                }
                else {
                    return item
                }
            }))
            message.success("🎉 Product Updated Successfully! 🎉")
            
        } catch (error) {
            message.error("Something went wrong!")
            console.log(error)
        }
    }

    const deleteProduct = (id) => {
        
            if (window.confirm("Are you sure you want to delete category?")) {
                    try {
                fetch(process.env.REACT_APP_SERVER_URL + "/api/products/delete-product", {
                    method: "DELETE",
                    body: JSON.stringify({ productId : id}),
                    headers: {
                        "Content-type" : "application/json; charset=UTF-8"
                    }
    
                })
                setProducts(products.filter((item)=> (item._id !== id)))
                message.success("Product Deleted Successfully 🎉.")
            } catch (error) {
                message.error("Something went wrong!")
                console.log(error)
            }
        }
    
    }
    

    const columns = [{
        title: "Products",
        dataIndex: "title",
        
    },
    {
        title: "Product Image",
        dataIndex: "img",
        render: (_, record) => {
            return (<img src={record.img} alt="" 
            className=' md:h-16 md:w-16 h-10 w-10 rounded-md object-fit'/>)
        } 
        
    },
    {
        title: "Product price",
        dataIndex: "price",
        
    },
    {
        title: "Category",
        dataIndex: "category",
        
    },
    {
        title: "Action",
        dataIndex: "action",
        render: (_, record) => {
            return (
                <div>
                    <Button type='link' onClick={
                        () => {
                            setEditingItem(record)
                            setIsEditModalOpen(true)
                        }
                    }>Edit</Button>
                    <Button type='link' danger onClick={ ()=> { deleteProduct(record._id) } }>delete</Button>
                </div>
            )
        }
    }

    ]


    return (
        <>
            <Table dataSource={products} columns={columns} rowKey="_id" />

            <Modal title="Add New Product" open={isEditModalOpen} onCancel={()=>{setIsEditModalOpen(false)}} footer={false}>
            <Form layout="vertical" initialValues={editingItem} onFinish={onFinish} form={form}>
                <Form.Item name="title" label="Product" rules={[{ required: true, message: "Product title cannot be left empty!" }]} >
                    <Input placeholder='Product title' />
                </Form.Item>
                <Form.Item name="img" label="Product Image(URL)" rules={[{ required: true, message: "Product Image cannot be left empty!" }]} >
                    <Input placeholder='Product image url' />
                </Form.Item>
                <Form.Item name="price" label="Product Price" rules={[{ required: true, message: "Product price cannot be left empty!" }]} >
                    <Input placeholder='Product price' />
                </Form.Item>
                <Form.Item name="category" label="Product Category" rules={[{ required: true, message: "Product category cannot be left empty!" }]} >
                    <Select
                        showSearch
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={categories}
                    />
                </Form.Item>
                <Form.Item className="flex justify-end mb-0">
                    <Button type="primary" htmlType="submit" onClick={()=>{setIsEditModalOpen(false)}}>Update</Button>
                </Form.Item>
            </Form>
        </Modal>
        
        </>
    )
}

export default Edit