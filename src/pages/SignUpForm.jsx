import { useState } from "react"
import { signUp } from "../services/auth"
import { useNavigate } from "react-router-dom"

const SignUpForm = (props) => {

    const navigate = useNavigate()

    const initialState = {
        username: '',
        password: '',
        confirmPassword: '',
        birthday: '',
        email: '',
    }

    const [formData, setFormData] = useState(initialState)
    const [message, setMessage] = useState('')

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }


const handleSubmit = async (event) => {
    
   event.preventDefault()

  try {
    const newUser = await signUp(formData)
    props.setUser(newUser)
    setFormData(initialState)
    navigate('/')
  } catch(err) {
    setMessage(err.message)
  }
}

    const isFormValid = () => {
        if(formData.username && formData.password && formData.password === formData.confirmPassword) {
            return true
        } else return false
    }

    return (

        <section className="auth-page">

        <div className="auth-card signup-card">

        <header className="auth-header">

        <h1>Join Vibely 💙</h1>

        <p> Create your account and start sharing your vibe</p>
                       
    
       {message && (<p className="auth-error"> {message} </p> )}
    
        </header>


        <form className="auth-form" onSubmit={handleSubmit}  >
      
        Username

        <input id="username"  type="text"  name="username"placeholder="Choose a username" onChange={handleChange} value={formData.username} required />  

        Birthday
        
        <input id="birthday" type="date"name="birthday"onChange={handleChange}value={formData.birthday} required />

      Email
    
      <input id="email" type="email"name="email"placeholder="Enter your email" onChange={handleChange}value={formData.email} required />
      
      Password
    
     <input id="password" type="password" name="password"placeholder="Create a password"  onChange={handleChange} value={formData.password} required />

     Confirm Password
    
    <input id="confirmPassword" type="password"name="confirmPassword" placeholder="Confirm your password" onChange={handleChange} value={formData.confirmPassword} required/>
 

    <div className="auth-actions">

     <button className="auth-submit"type="submit"  disabled={!isFormValid()}>  Sign Up   </button>
   
    <button className="auth-cancel" type="button"onClick={() => navigate('/')}>   Cancel </button>
              

        </div>

        </form>

        </div>

        </section>
    )
}

export default SignUpForm
