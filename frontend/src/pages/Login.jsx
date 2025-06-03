import React from 'react'
import { SignIn } from '@clerk/clerk-react'
// This component renders the sign-in form using Clerk's SignIn component

const Login = () => {
  return (
    <div>
      <SignIn />
    </div>
  )
}

export default Login
