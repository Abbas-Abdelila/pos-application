import { Button, Carousel, Form, Input, message } from "antd"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import AuthCarousel from "./AuthCarousel"




const Register = () => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true)
    try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });

      if (res.status == 200) {
        message.success("Registered Successfully 🎉!");
        navigate("/login");
        setLoading(false);
      }

    } catch (error) {
      message.error("Something went wrong!")
      console.log(error)
    }

  }




  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="px-10 xl:px-20 flex flex-col justify-center h-full bg-gray-50 relative w-full">
          <h1 className="text-5xl font-bold text-center w-full">LOGO</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Username"
              name={"username"}
              rules={
                [{
                  required: true,
                  message: "Username cannot be left empty!"
                }]
              }
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name={"email"}
              rules={
                [{
                  required: true,
                  message: "Email cannot be left empty!"
                }]
              }
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name={"password"}
              rules={
                [{
                  required: true,
                  message: "Password cannot be left empty!"
                }]
              }
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Reapeat Password"
              name={"repeat password"}
              dependencies={['password']}
              rules={
                [{
                  required: true,
                  message: "Password cannot be left empty!"
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
                ]
              }
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>

              <Button loading={loading} type="primary" size="large" className="w-full" htmlType="submit">Register</Button>
            </Form.Item>
          </Form>

          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Already have an account?&nbsp;
            <Link to="../login" className="
              text-blue-600 
              hover:text-blue-800 transition-transform 
              duration-200 delay-200">Sign in</Link>
          </div>

        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden h-full bg-[#6c63ff] px-10">
          <div className="w-full h-full flex  items-center">
            <div className="w-full">
              <Carousel className="!h-full" autoplay>

                <AuthCarousel
                  image={"images/statistic.svg"}
                  title={"Statistics"}
                  desc={"Have analytic insight of your customers"} />

                <AuthCarousel
                  image={"images/responsive.svg"}
                  title={"Responsive"}
                  desc={"Access using any device"} />

                <AuthCarousel
                  image={"images/customer.svg"}
                  title={"Customers"}
                  desc={"Have happy customers!"} />

                <AuthCarousel
                  image={"images/admin.svg"}
                  title={"Admin Tools"}
                  desc={"Run your business from your Dashboard"} />

              </Carousel>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register