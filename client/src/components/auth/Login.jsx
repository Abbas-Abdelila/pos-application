import { Button, Carousel, Checkbox, Form, Input, message } from "antd"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthCarousel from "./AuthCarousel"


const Login = () => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);


  const onFinish = async (values) => {
    setLoading(true)
    try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });

      const user = await res.json()
      
      if (res.status === 200) {
        localStorage.setItem("posUser", JSON.stringify({
          username : user.username,
          email: user.email
        }))

        message.success("Signed in!");
        navigate("/");
        setLoading(false);
      } 
      else if (res.status === 404 || res.status === 403) {
        message.error("Username or Password is incorrect");
        setLoading(false);
      }

    } catch (error) {
      message.error("Something went wrong!")
      setLoading(false)
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
            <div className="flex justify-between pb-4">
                <Checkbox>Remeber me</Checkbox>
                <p to="" className="text-sm
                 text-blue-500 
                 hover:text-blue-700 
                 transition-transform duration-200 delay-200 cursor-pointer">Forgot password?</p>
            </div>

            <Form.Item>

              <Button loading={loading} type="primary" size="large" className="w-full" htmlType="submit">Login</Button>
            </Form.Item>
          </Form>

          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Don't have an account?&nbsp;
            <Link to="../register" className="
              text-blue-600 
              hover:text-blue-800 transition-transform 
              duration-200 delay-200">Register</Link>
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

export default Login