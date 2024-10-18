import React from 'react'

const Card = (props) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-400">
    <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-extrabold text-center mb-6">{props.title}</h2>
        <h3 className='text-base font-medium text-center mb-6 text-gray-500'>{props.subTitle}</h3>
        <form>
            {props.isSignUp && <label className='block text-sm font-bold text-gray-700 mb-2'>Username</label> }
            {props.isSignUp &&  
            <input
                type="text"
                placeholder="Username"
                required
                className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            />
            }
            {props.isSignUp && <label className='block text-sm font-bold text-gray-700 mb-2'>Email</label>}
            {props.isSignUp &&  <input
                type="email"
                placeholder="Email"
                required
                className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            />}
           
            <label className='block text-sm font-bold text-gray-700 mb-2'>Password</label>
            <input
                type="password"
                placeholder="Password"
                required
                className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            />
            <button
                type="submit"
                className="mt-2 bg-black text-white rounded-lg p-2 w-full hover:bg-gray-700"
            >
                Create Account
            </button>
        <label className='block text-sm font-medium text-center text-black mb-2 mt-3'>Alreay have an account ? Login</label>
        </form>
    </div>
</div>
  )
}

export default Card