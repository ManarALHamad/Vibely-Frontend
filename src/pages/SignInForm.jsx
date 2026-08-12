import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { signIn } from "../services/auth"


const SignInForm = (props) => {

    const navigate = useNavigate()

    const initialState = {
        username: '',
        password: '',
    }
    const [formData, setFormData] = useState(initialState)
    const [message, setMessage] = useState('')

    const handleChange = (event) => {
        setMessage('')
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const signedInUser = await signIn(formData)
            props.setUser(signedInUser)
            setFormData(initialState)
            navigate('/')
        } catch(err) {
            setMessage(err.message)
        }
    }
return(
  <section className="auth-page">

  <div className="auth-card">

<header className="auth-header">

<h1>Welcome Back</h1>

<p> Sign in to continue to Vibely</p>
                       
                    

{message && ( <p className="auth-error"> {message} </p>
                       
)}


</header>

<form className="auth-form" onSubmit={handleSubmit}>

 Username
                       
<input id="username" type="text" name="username" value={formData.username} required onChange={handleChange} placeholder="Enter your username"/>
                       

Password 
                       
<input id="password" type="password" name="password" value={formData.password}  required onChange={handleChange} placeholder="Enter your password"  />          

    <div className="auth-actions">

    <button type="submit"className="auth-submit"> Sign In </button>
                            
 
    <button type="button" className="auth-cancel"onClick={() => navigate('/')} > Cancel </button>
      

     </div>

     </form>

      </div>

    </section>
    )
}
    

export default SignInForm