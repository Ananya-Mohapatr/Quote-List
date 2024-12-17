import React , {useState} from 'react'
import { login } from '../Services/api'
const LoginPage = () => {
  const [userName,setUserName] = useState('')
  const [otp,setOtp] = useState('')
  const handleLogin = async() =>{
     try{
      let payload = {'username':userName ,'Otp':otp}
      const data = await login(payload)
      localStorage.setItem('authToken',data.token)
     }
     catch(err){
      console.log("error",err)
      alert("Login Failed")
     }
  }
  return (
    <div >
     <h1 className='text-center'>Login</h1>
     <input
     type="text"
     placeholder='User Name'
     value={userName}
     onChange={(e)=>setUserName(e.target.value)}/>
     <input
     type='password'
     placeholder='OTP'
     value={otp}
     onChange={(e)=>setOtp(e.target.value)}/>
    <button onClick={handleLogin}>User Login</button>
    </div>
  )
}

export default LoginPage