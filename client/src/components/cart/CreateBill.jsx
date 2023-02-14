import { Button, Card, Form, Input, message, Modal, Select } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../redux/cartSlice";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: ((cart.total * cart.tax)).toFixed(2),
          totalAmount: (cart.total * (1 + cart.tax)).toFixed(2),
          cartItems: cart.cartItems,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (res.status === 200) {
        message.success("Fatura başarıyla oluşturuldu.");
        dispatch(reset());
        navigate("/bills");
      }
    } catch (error) {
      console.log(error);
    }
  };

    const cart = useSelector(state => state.cart)

    return (
        <>
        <Modal
        title="Fatura Olustur"
        footer={false} 
        open={isModalOpen} 
        onCancel={() => setIsModalOpen(false)}
       >
        <Form layout={"vertical"}  onFinish={onFinish}>
            <Form.Item
             label="Customer Name"
             name={"customerName"}
             rules={[{required: true, message:"Cannot be left Empty"}]}>
                <Input placeholder="Enter your name"></Input>
            </Form.Item>

            <Form.Item 
            label="Telephone"
            name={"customerPhoneNumber"}
            rules={[{required: true, message:"Cannot be left Empty"}]}>
                <Input placeholder="Enter your name"></Input>
            </Form.Item>

            <Form.Item 
            label="Select Payment Mode"
            name={"paymentMode"}
            rules={[{required: true, message:"Select Payment"}]}>
                <Select>
                    <Select.Option value=""></Select.Option>
                    <Select.Option value="Cash">Cash</Select.Option>
                    <Select.Option value="Bank Card">Bank Card</Select.Option>
                </Select>
            </Form.Item>
        
        <Card>
          <div className="flex justify-between">
            <span>Ara Toplam</span>
            <span>$ {(cart.total > 0) ? cart.total.toFixed(2) : 0}</span>
          </div>

          <div className="flex justify-between my-2">
            <span>KDV %8 Toplam</span>
            <span className="text-red-700">{(cart.total > 0) ? `+ $ ${(cart.total * cart.tax).toFixed(2)}` : 0}</span>
          </div>

          <div className="flex justify-between">
            <b>Toplam</b>
            <b>$ {(cart.total > 0) ? ` ${(cart.total * (1 + cart.tax)).toFixed(2)}` : 0}</b>
          </div>

          <div className="flex justify-end">
          <Button className="mt-4" 
          type="primary" size="medium" onClick={() => setIsModalOpen(true)}
          htmlType="submit">Siparis Olustur</Button>
          </div>
        </Card>
      
        </Form>
        <div>
            
        </div>
        </Modal>

        
        </>
    );
}

export default CreateBill