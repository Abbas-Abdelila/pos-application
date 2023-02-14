import { Button, Form, Input, message, Table } from 'antd'
import Modal from 'antd/es/modal/Modal'
import React, { useState } from 'react'

const Edit = ({ isEditModalOpen, setIsEditModalOpen, categories, setCategories }) => {

    const [isEditingRow, setIsEditingRow] = useState({});

    const  onFinish = (values) => {
        try {
            fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/update-category", {
                method: "PUT",
                body: JSON.stringify({ ...values, categoryId:isEditingRow._id }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            })
            message.success("🎉 Title Updated Successfully! 🎉")
            setCategories(categories.map((item) => {
                    if (item._id === isEditingRow._id) {
                        return {...item, title: values.title}
                    }
                    else {
                        return item;
                    }
                }));
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCategory = (record) => {

        if (window.confirm("Are you sure you want to delete category?")) {
            try {
                fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/delete-category", {
                    method: "DELETE",
                    body: JSON.stringify({ categoryId : record._id}),
                    headers: {
                        "Content-type" : "application/json; charset=UTF-8"
                    }
    
                })
                message.success("Category Deleted Successfully 🎉.")
                setCategories(categories.filter((item) =>  (item._id !== record._id)))
            } catch (error) {
                console.log(error)
            }
        }
        
    }

    const columns = [{
        title: "Categories",
        dataIndex: "title",
        render: (_, record) => {
            if (record._id === isEditingRow._id) {
                return (
                        <Form.Item name="title" className='flex items-center mb-0'>
                            <Input defaultValue={record.title} />
                        </Form.Item>
                )
            } else {
                return <p>{record.title}</p>
            }
        }
    },
    {
        title: "Action",
        dataIndex: "action",
        render: (_, record) => {
            return (
                <div>
                    <Button type='link' className='pl-0' onClick={() => { setIsEditingRow(record) }}>Edit</Button>
                    <Button type='link' htmlType='submit'>Save</Button>
                    <Button type='link' danger onClick={() => { deleteCategory(record)}} >delete</Button>
                </div>
            )
        }
    }

    ]


    return (
        <Modal title="Edit Categories" open={isEditModalOpen} onCancel={() => { setIsEditModalOpen(false) }}
            footer={false} >
            <Form  onFinish={onFinish} >
                    <Table dataSource={categories} columns={columns} rowKey={"_id"} />
            </Form>
        </Modal>
    )
}

export default Edit