import React from 'react'

const StatisticsCard = ({ title, amount, img}) => {
  return (
    <div className='card-item bg-gray-900 p-8 rounded-xl hover:cursor-pointer'>
    <div className='flex gap-x-4 items-center'>
        <div className='bg-white rounded-full w-16 h-16 p-3'>
            <img  src={img} alt="" />
        </div>

        <div className='text-gray-400'>
            <p className='text-lg  mb-2 font-medium'>{title}</p>
            <p className='text-md font-medium'>{amount}</p>
        </div>
    </div>
</div>
  )
}

export default StatisticsCard