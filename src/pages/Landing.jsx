
import logo from "../assets/logo.png"


const Landing = () => {
    return (

<section className="landing-page">

<div className="landing-content">

<img src={logo} alt="Vibely Logo"  className="landing-logo"/>
      
<h1>Welcome to <span>Vibely</span> 💙</h1>
               
<p className="landing-tagline">
   Share your vibe. Discover what's happening.
    Connect with people </p>
              
    
    <p className="landing-small-text"> Create • Share • Connect </p>
                   
            
     </div>
        </section>
    )
}

export default Landing