/* eslint-disable react/prop-types */
import React from 'react'

const RoleConfig = ({values, errors,touched, handleBlur, handleChange,}) => {
  return (
    <div className=' py-4'>
        {/* name  */}
        <div className='flex flex-col p-5 w-[60%]'>
            <label htmlFor="name" className='pb-2'> Name</label>
            <input id='name' name='role' value={values.role} onChange={handleChange} onBlur={handleBlur} className='bg-transparent border border-[#293550] h-10 rounded-lg px-3' placeholder='Enter your tag name' />
        </div>
        {/* description */}
         <div className='flex flex-col p-5 w-[60%]'>
            <label htmlFor="name" className='pb-2'> Description</label>
            <input id='name' name='description' value={values.description} onChange={handleChange} onBlur={handleBlur} className='bg-transparent border border-[#293550] h-10 rounded-lg px-3' placeholder='Enter your tag description' />
        </div>
    </div>
  )
}

export default RoleConfig