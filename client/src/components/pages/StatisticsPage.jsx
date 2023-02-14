import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import StatisticsCard from './StatisticsCard'
import { Area, Pie } from '@ant-design/plots';
import { Spin } from 'antd';

const StatisticsPage = () => {

    const [data, setData] = useState();
    const [products, setProducts] = useState([]);

    const user = JSON.parse(localStorage.getItem("posUser"));

    useEffect(() => {
      asyncFetch();
    }, []);


    const asyncFetch = () => {
    fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/get-all")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

   const config = {
    data,
    xField: 'customerName',
    yField: 'subTotal',
    xAxis: {
      range: [0, 1],
    },
  };

  
  const config2 = {
    appendPadding: 10,
    data,
    angleField: 'subTotal',
    colorField: 'customerName',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'visible',
          textOverflow: 'ellipsis',
        },
        content: 'Total\nValue',
      },
    },
  };

  useEffect(() => {
    const getProducts = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
      const data = await res.json();
      setProducts(data)
      
    } catch (error) {
        console.log(error)
    }
  }

  getProducts()
  }, [])


  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0);
    return `$ ${amount.toFixed(2)}`;
  }


  return (
    <>
        <Header />
        <h1 className='text-4xl text-center font-semibold mb-4'>Statistics</h1>
        {data ? (
          <div className='px-6 overflow-auto max-h-[calc(100vh_-_117px)] pb-20'>
          <div >
              <h2 className='text-lg'>Welcome <span className='text-green-700 font-semibold'>{user.username}</span></h2>
              <div className='statistics-cards grid md:grid-cols-2 xl:grid-cols-4 my-10 md:gap-10 gap-4 '>
                 <StatisticsCard title={"Total Users"} amount={data?.length} img={"images/user.png"} />
                 <StatisticsCard title={"Total Revenue"} amount={totalAmount()} img={"images/money.png"} />
                 <StatisticsCard title={"Total Sale"} amount={data?.length} img={"images/sale.png"} />
                 <StatisticsCard title={"Total Product"} amount={products.length} img={"images/product.png"} />

              </div>
              <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
          <div className='lg:w-1/2 lg:h-72 h-64'>
            <Area {...config} />
          </div>
          <div className='lg:w-1/2 lg:h-72 h-64'>
            <Pie {...config2} />
          </div>
        </div>
        
              
          </div>

      </div>
        ): <Spin size="large" className="absolute top-1/2 h-screen w-screen flex justify-center" />}
    </>
  )
};

export default StatisticsPage