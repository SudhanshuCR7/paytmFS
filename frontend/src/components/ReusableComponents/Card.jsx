import React from 'react'
import { useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Card = (props) => {

    const [signupFormData, setSignupFormData] = useState({
        username : "",
        firstName: "",
        lastName: "",
        password: ""
    })

    const [signinFormData, setSigninFormData]= useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupFormData({ ...signupFormData, [name]: value });
    };

    const handleChangeSignIn = (e) => {
        const { name, value } = e.target;
        setSigninFormData({ ...signinFormData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
          const response = await fetch("http://localhost:3000/api/v1/user/signup", {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body : JSON.stringify(signupFormData)
          })

          if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.msg || 'Something went wrong.');
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          console.log('Success:', data);
          navigate('/dashboard'); // Navigate to the dashboard
        }

        catch (error) {
          console.log("error "+ error);
        }
     
    }

    const handleSignInSubmit = async (e) => {
       e.preventDefault();
       setError('');

       try { 
        const response = await fetch("http://localhost:3000/api/v1/user/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signinFormData)
        })

        if(!response.ok){
            const errorData = await response.json();
            setError(errorData.msg || "Something went wrong");
            throw new Error("Network respone was not ok");
        }

        const data = await response.json();
        console.log("success", data);
        navigate('/dashboard')

       }
       catch (error){
        console.log("error",error)
       }
    }
    
  
  return (
    <div className="flex items-center justify-center h-screen bg-gray-400">
    <div className="bg-white p-8 rounded-lg shadow-md w-82">

        <h2 className="text-2xl font-extrabold text-center mb-6">{props.title}</h2>
        <h3 className='text-base font-medium text-center mb-6 text-gray-500'>{props.subTitle}</h3>

        <form onSubmit={props.isSignUp ? handleSubmit : handleSignInSubmit}>
            {props.isSignUp && <label className='block text-sm font-bold text-gray-700 mb-2'>First Name</label> }
            {props.isSignUp &&  
            <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={signupFormData.firstName}
                required
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            />
            }
            {props.isSignUp && <label className='block text-sm font-bold text-gray-700 mb-2'>Last Name</label> }
            {props.isSignUp &&  
            <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={signupFormData.lastName}
                required
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            />
            }
            <label className='block text-sm font-bold text-gray-700 mb-2'>Email</label>
            <input
                type="email"
                placeholder="Email"
                name="username"
                value={props.isSignUp ? signupFormData.username : signinFormData.username} 
                required
                onChange={props.isSignUp ? handleChange : handleChangeSignIn}
                className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            />
           
            <label className='block text-sm font-bold text-gray-700 mb-2'>Password</label>
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={props.isSignUp ? signupFormData.password : signinFormData.password}
                required
                onChange={props.isSignUp ? handleChange : handleChangeSignIn}
                className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            />
            <button
                type="submit"
                className="mt-2 bg-black text-white rounded-lg p-2 w-full hover:bg-gray-700"
            >
              {props.title}
            </button>

            {error && <div className='block text-sm font-medium text-center text-red-500 mb-2 mt-3'>{error}</div>}

            {props.isSignUp && <label className='block text-sm font-medium text-center text-black mb-2 mt-3'>Already have an account ?
            <Link  className="ml-2 underline" to="/signin">Login</Link>
            </label>}

            {!props.isSignUp && <label className='block text-sm font-medium text-center text-black mb-2 mt-3'>Don't have an account ?
            <Link  className="ml-2 underline" to="/signup">Sign up</Link>
            </label>}
        </form>
    </div>
</div>
  )
}

export default Card