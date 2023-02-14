import { Button, Form, Input, message, Modal, Select } from 'antd'
import React from 'react'

const Add = ({ isAddModalOpen, setIsAddModalOpen, products, setProducts, categories }) => {

    const [form] = Form.useForm();

    const handleCancel = () => {
        setIsAddModalOpen(false)
    }


    const onFinish = (values) => {
        try {
            fetch(process.env.REACT_APP_SERVER_URL + "/api/products/add-product", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            })
            message.success("Product added successfully 🎉.")
            form.resetFields();
            setProducts([...products, {
                ...values,
                _id: Math.random() * 1000,
                price: Number(values.price),
                title: values.title,
            }]);
            setIsAddModalOpen(false)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Modal title="Add New Product" open={isAddModalOpen} onCancel={handleCancel} footer={false}>
            <Form layout="vertical" onFinish={onFinish} form={form}>
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
                    <Button type="primary" htmlType="submit">Add</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Add