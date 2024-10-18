import React from 'react'
import Card from './ReusableComponents/Card'

const Signin = () => {
  return (
    <div>
      <Card title={"Sign In"} subTitle={"Enter your credentials to access your account"} isSignUp={false}/>
    </div>
  )
}

export default Signin