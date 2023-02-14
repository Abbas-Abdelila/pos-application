import { BarChartOutlined, CopyOutlined, HomeOutlined, LogoutOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Input, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css"

const Header = ({ setSearch }) => {

  const { pathname } = useLocation()

  const cart = useSelector((state)=> state.cart)
  const navigate = useNavigate();
  const handleLogout = () => {
    if(window.confirm("Do you want to logout?")) {
      localStorage.removeItem("posUser");
      message.success("Logged out!")
      navigate('/login')
    }
    else{
      navigate(pathname);
    }
  }

  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <Link to="/" className="text-2xl md:text-4xl font-thin text-slate-600">
            PAY-D
          </Link>
        </div>
        <div className="header-search flex-1 flex justify-center" onClick={() => pathname !== "/" && navigate("/")}>
          <Input
            size="large"
            placeholder="Search product..."
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="menu-links">
          <Link to="/" className={`menu-link ${pathname === "/" && "active"}`} >
            <HomeOutlined className="text-xl md:text-2xl" />
            <span className="md:text-xs text-[10px]">Home</span>
          </Link>
          <Badge count={cart.cartItems.length} offset={[0, 5.7]} className="hidden md:flex">
            <Link to="/cart" className={`menu-link ${pathname === "/cart" && "active"}`} >
              <ShoppingCartOutlined className="text-xl md:text-2xl " />
              <span className="md:text-xs text-[10px]">Cart</span>
            </Link>
          </Badge>
          <Link to="/bills" className={`menu-link ${pathname === "/bills" && "active"}`} >
            <CopyOutlined className="text-xl md:text-2xl" />
            <span className="md:text-xs text-[10px]">Receipt</span>
          </Link>
          <Link to="/customers" className={`menu-link ${pathname === "/customers" && "active"}`} >
            <UserOutlined className="text-xl md:text-2xl" />
            <span className="md:text-xs text-[10px]">Customers</span>
          </Link>
          <Link to="/statistics" className={`menu-link ${pathname === "/statistics" && "active"}`} >
            <BarChartOutlined className="text-xl md:text-2xl" />
            <span className="md:text-xs text-[10px]">Statistics</span>
          </Link>
          <div onClick={handleLogout}>
          <Link to="/" className="menu-link" >
            <LogoutOutlined className="text-xl md:text-2xl" />
            <span className="md:text-xs text-[10px]">Logout</span>
          </Link>
          </div>

        </div>
        <Badge count={Number(cart.cartItems.length)} offset={[0, 5.7]} className="md:hidden flex" >
          <Link to="/" className="menu-link flex flex-col hover:text-[#40a9ff] transition-all" >
            <ShoppingCartOutlined className="text-2xl" />
            <span className="md:text-xs text-[10px]">Cart</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
}

export default Header;
