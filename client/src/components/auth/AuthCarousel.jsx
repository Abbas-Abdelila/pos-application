import React from 'react'

const AuthCarousel = ({image, title, desc}) => {
  return (
    <div className="!flex flex-col justify-center items-center h-full">
                <img src={image} alt="statistics" 
                className="w-[500px] h-[400px]" />
                <h3 className="text-5xl text-center text-white ">{title}</h3>
                <p className="text-xl text-white text-center mb-10">{desc}</p>
    </div>
  )
}

export default AuthCarousel