import { Link } from "react-router-dom"

const Nav = (props) => {

    const handleSignOut = () => {
        localStorage.removeItem('token')
        props.setUser(null)
    }

    return (
        <nav>

            <Link className="nav-brand" to="/">
                Vibely
            </Link>

            {props.user ? (

          <ul>

          <li>Welcome, {props.user.username}!</li>

           <li> <Link to="/">FEED  </Link> </li>     
                       
           <li>  <Link to="/posts/new"> NEW POST </Link> </li>            
                       
           <li>  <Link to="/profile"> PROFILE </Link> </li>
                    
           <li>  <Link to="/" onClick={handleSignOut}> Sign Out </Link>  </li>      
   
            </ul> ) : (
               //not a user  
             <ul>

            <li> <Link to="/"> Home</Link> </li>

            <li>  <Link to="/sign-up"> Sign Up  </Link> </li>   
                        
             <li> <Link to="/sign-in"> Sign In </Link> </li>
                        
              </ul>               
                        
                    

               

            )}

        </nav>
    )
}

export default Nav