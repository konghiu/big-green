import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { removeAll, setVoucher } from '../reducer/Actions'
import Context from '../reducer/Context'

const CompletePayment = () => {

     const navigate = useNavigate()
     const consumer = useContext(Context)
     const { items_in_cart, info_user, set_voucher } = consumer[0]
     const dispatch = consumer[1]
     const [ goOn, setGoOn ] = useState(false)



     const total_price = useMemo(() => {
          let total = 0
          items_in_cart.forEach(item => {
               const price = Number(item['new-price'].replace('.', '').replace('.', ''))
               total = (total + price*item.amount) * set_voucher.percent 
          })
          return total
     }, [items_in_cart])

     const total_quantity = useMemo(() => {
          let total = 0
          items_in_cart.forEach(item => {
               total = (total + item.amount)
          })

          return total
     }, [items_in_cart])


     useEffect(() => {
          if(items_in_cart.length === 0) {
               navigate('/big-green/not-found')
          }

          return () => {
               if(goOn) {
                    navigate('/big-green/san-pham')
               } else {
                    navigate('/big-green/trang-chu')
               }
               dispatch(setVoucher({"percent": 1, "is_voucher": false}))
               localStorage.removeItem('items_in_cart')
               dispatch(removeAll(true))
          }
     }, [goOn])


  return (
    <div className='relative payment-parent w-full flex justify-center pt-10 overflow-hidden tb-mb:overflow-visible'
          style={{'backgroundColor': '#f2f2f2'}}
    >
         <div className='width-screen flex flex-col'>
              <p className='text-3xl text-blue-600 mb-5'>Template Green Food</p>
              <div className='flex tb-mb:flex-col'>
                    <div className='w-3/5 flex flex-col tb-mb:w-full'>
                         <div className='flex items-center'>
                              <i className="fa-solid fa-check text-3xl text-green-400 px-5 py-4 flex justify-center items-center border-2 border-green-400 mr-4 rounded-full"></i>
                              <div className='flex flex-col'>
                                   <p className='text-xl font-semibold mb-1'>C???m ??n b???n ???? ?????t h??ng</p>
                                   <div className='text-sm grid mt-1'>
                                        <p className=''>M???t email x??c nh???n ???? ???????c g???i t???i yourEmail@gmail.com.</p>
                                        <p>Xin vui l??ng ki???m tra email c???a b???n</p>
                                   </div>
                              </div>
                         </div>
                         <div className='flex flex-col flex-1 mt-10 ml-5 p-5 border-2 tb-mb:ml-0'>
                              <div className='grid grid-cols-2 sm:grid-cols-1 mb:grid-cols-1'>
                                   <div className='mb-2'>
                                        <p className='font-semibold text-xl mb-1'>Th??ng tin mua h??ng</p>
                                        <div className=''>
                                             <p className='mb-1'>{info_user.fullName}</p>
                                             <p className='mb-1'>{info_user.email}</p>
                                             <p>{info_user.numberPhone}</p>
                                        </div>
                                   </div>
                                   <div className='mb-2'>
                                        <p className='font-semibold text-xl mb-1'>?????a ch??? nh???n h??ng</p>
                                        <div className=''>
                                             <p className='mb-1'>{info_user.fullName}</p>
                                             <p className='mb-1'>{info_user.address}</p>
                                             <p className='mb-1'>{info_user.xa}, {info_user.quan}, {info_user.tinh}</p>
                                             <p className='mb-1'>{info_user.numberPhone}</p>
                                        </div>
                                   </div>
                              </div>
                              <div className='grid grid-cols-2 sm:grid-cols-1 mb:grid-cols-1'>
                                   <div className='mb-2'>
                                        <p className='font-semibold text-xl mb-1'>Ph????ng th???c thanh to??n</p>
                                        <div className=''>
                                             <p className='mb-1'>Thanh to??n khi giao h??ng (COD)</p>
                                        </div>
                                   </div>
                                   <div className='mb-2'>
                                        <p className='font-semibold text-xl mb-1'>Ph????ng th???c v???n chuy???n</p>
                                        <div className=''>
                                             <p className='mb-1'>Giao h??ng t???n n??i</p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className='flex justify-end mt-10'>
                              <button 
                                   className='px-10 py-4 bg-blue-500 hover:bg-blue-700 text-white text-lg rounded-lg sm:mb-10 mb:mb-10' 
                                   onClick={() => {
                                        setGoOn(true)
                                        dispatch(setVoucher({"percent": 1, "is_voucher": false}))
                                   }}     
                              >Ti???p t???c mua h??ng</button>
                         </div>
                    </div>
                    <div className='flex-1 ml-10 '>
                         <div className='flex flex-col bg-white md:hidden sm:hidden mb:hidden '>
                              <p className='font-semibold pl-3 pt-3'>????n h??ng #1006 ({total_quantity})</p>
                              <div className='flex flex-col mt-5 pb-2 px-3 border-b-2 border-zinc-300'>
                                   {
                                        items_in_cart.map((item, index) => (
                                        <div 
                                             key={index}
                                             className='flex items-center justify-between py-2 w-full'  
                                        >
                                             <div className='relative w-12 rounded-xl'>
                                                  <img src={item.image} alt='' className='rounded-xl border-2'/>
                                                  <span className='absolute -top-2 -right-2 text-sm bg-orange-600 text-white px-2 rounded-xl'>{item.amount}</span>
                                             </div>
                                             <p className='text-sm flex-1 ml-5'>{item.name}</p>
                                             <p className='text-sm justify-self-end'>{item['new-price']}<sup>??</sup></p>
                                        </div>
                                        ))
                                   }
                              </div>
                              <div
                                   className='py-2 px-3  border-b-2 border-zinc-300'
                              >
                                   <div className='flex justify-between'>
                                        <p>T???m t??nh</p>
                                        <div className='flex'>
                                             {
                                                  set_voucher.is_voucher 
                                                  ?
                                                  <p className='bg-orange-600 text-white px-3 rounded-lg mr-2'>-{set_voucher.percent * 100}%</p>
                                                  :  null
                                             }
                                             <p>{total_price.toLocaleString() }<sup>??</sup></p>
                                        </div>
                                   </div>
                                   <div className='flex justify-between'>
                                        <p>Ph?? v???n chuy???n</p>
                                        <p>40,000<sup>??</sup></p>
                                   </div>
                              </div>
                              <div className='flex justify-between py-2 px-3 border-zinc-300'>
                                   <p>T???ng c???ng</p>
                                   <p className='text-xl text-blue-400 font-semibold'>{(total_price + 40000).toLocaleString()}<sup>??</sup></p>
                              </div>
                         </div>
                    </div>
              </div>
         </div>
    </div>
  )
}

export default CompletePayment