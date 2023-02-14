import { Button, Form, Input, message, Modal } from 'antd'
import React from 'react'

const Add = ({ isAddModalOpen, setIsAddModalOpen, categories, setCategories }) => {

    const [form] = Form.useForm();

    const handleCancel = () => {
        setIsAddModalOpen(false)
    }


    const onFinish = (values) => {
        try {
            fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/add-category", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            })
            message.success("Category added successfully 🎉.")
            form.resetFields();
            setCategories([...categories, {
                _id : Math.random()*1000,
                title : values.title,
            }]);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Modal title="Add New Category" open={isAddModalOpen} onCancel={handleCancel} footer={false}>
            <Form layout="vertical" onFinish={onFinish} form={form}>
                <Form.Item name="title" label="Category" rules={[{ required: true, message: "Category cannot be left empty!" }]} >
                    <Input />
                </Form.Item>
                <Form.Item className="flex justify-end mb-0">
                    <Button type="primary" htmlType="submit">Add</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Add