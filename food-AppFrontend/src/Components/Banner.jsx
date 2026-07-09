import React from 'react'
import { useState,useEffect } from 'react'
import f1 from '../assets/f1.jpg'
import f2 from '../assets/f2.jpg'
import f3 from '../assets/f3.jpg'
import f4 from '../assets/f4.jpg'
const Banner = () => {
const banner =[f1,f2,f3,f4];
const [currentIdx,ChangedIdx]= useState(0);
useEffect(()=>{
   const timer = setInterval(()=>{
   ChangedIdx((prev)=>(prev+1)%banner.length)
 },3000)
 return ()=>clearInterval(timer)
},[])

  return (
    <div className='w-full h-[70vh] '>
        <img className='w-full h-full object-cover'src={banner[currentIdx]} alt="banner" />
    </div>
  )
}

export default Banner