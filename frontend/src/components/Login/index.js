import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

function Login() {

   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [showSubmitErr, setShowErr] = useState(false)
   const [errMsg, setErrmsg ] = useState("")

  const [name, setUserName] = useState("")
  const [mail, setMail] = useState("")
  const [pass, setPass] = useState('')
  const [showRegErr, setShowRegErr] = useState(false)
  const [regerr, setRegerr] = useState("")

     const navigate = useNavigate();

    const submitForm = async event => {
        event.preventDefault()

    const userDetails = {email, password}
    const url = 'https://fashion-store-xjgc.onrender.com/login'
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.token, {expires: 30})
      navigate("/", {replace : true})
      
    } else {
      setErrmsg(data.message)
      setShowErr(true)
    }
    }

    const submitRegister = async event => {
    event.preventDefault()

    const userDetails = {email :mail, name, password:pass}
    const url = 'https://fashion-store-xjgc.onrender.com/register'

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.token, {expires: 30})
      navigate("/", {replace : true})
      alert("Registration successfull")
    } else {
      setRegerr(data.msg)
      setShowRegErr(true)
    }
    }

const loginContainer = () =>{
  return (
    <div className='login-container'>
        <div className='login-div'>
          <form onSubmit={submitForm}>
            <h3 className='store-name-log'>Login In</h3>
          <div className="input-container">
                  <label htmlFor="username">EMAIL</label>
                  <input
                    id="username"
                    type="text"
                    className="login-input"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="password">PASSWORD</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    className="login-input"
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
                {showSubmitErr && <p className="error-msg">{errMsg}</p>}
                <button type="submit" id="login" className="login-button">
                  Login
                </button>
              </form>
        </div>
    </div>
  )
}

const registerContainer = ()=>(
  <div className='register-container'>
        <div className='register-div'>
          <form onSubmit={submitRegister}>
            <h3 className='store-name-log'>Register</h3>
            <div className="input-container">
                  <label htmlFor="newusername">UserName</label>
                  <input
                    id="newusername"
                    type="text"
                    className="login-input"
                    value={name}
                    onChange={(e)=>setUserName(e.target.value)}
                  />
                </div>
          <div className="input-container">
                  <label htmlFor="newmail">EMAIL</label>
                  <input
                    id="newmail"
                    type="text"
                    className="login-input"
                    value={mail}
                    onChange={(e)=>setMail(e.target.value)}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="password">PASSWORD</label>
                  <input
                    id="password"
                    type="password"
                    value={pass}
                    className="login-input"
                    onChange={(e)=>setPass(e.target.value)}
                  />
                </div>
                {showRegErr && <p className="error-msg">{regerr}</p>}
                <button type="submit" id="register" className="register-button">
                  Register
                </button>
              </form>
        </div>
    </div>
)

return(
  <div className='container'>
    {loginContainer()}{registerContainer()}
  </div>
)}

export default Login