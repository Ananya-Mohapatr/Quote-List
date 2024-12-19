import React , {useState} from 'react'
import { login } from '../Services/api'
import './LoginPage.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import loaderImg from '../gradient-5812_256.gif'
const LoginPage = () => {
  const [userName,setUserName] = useState('')
  const [otp,setOtp] = useState('')
  const [showLoader,setShowLoader] = useState(false)
  const history = useHistory()
  const handleLogin = async() =>{
    try{
      setShowLoader(true)
      let payload = {'username':userName ,'otp':otp}
      const data = await login(payload)
      localStorage.setItem('authToken',data.token)
      setShowLoader(false)
      history.push('/quote-list')
     }
     catch(err){
      setShowLoader(false)
      console.log("error",err)
      alert("Login Failed")
     }
  }
  return (
    <>
    {showLoader && <img className='loader' src={loaderImg} alt='Loading...'/>}
    <div className="login-page-container">
      <div className="login-box">
        <h2>Login</h2>
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
    </div>
    </>
  )
}

export default LoginPage
