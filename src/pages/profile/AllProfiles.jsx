// this page will show all the profiles

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import * as userService from "../../services/user"

const AllProfiles = (props) => { 

const [allUsers, setAllUsers] = useState([])

useEffect(() => {

    const fetchUsers = async () => {

        try {
        
        const usersData = await userService.index() 
        setAllUsers(usersData)

            
        } catch (error) {

        console.log(error)

        }
    }

    fetchUsers()



}, [])


return (

    <main className="profiles-page">

        <h1>All Profiles</h1>

    <div className="profiles-container">

    {allUsers.map((user) => (    

        <div className="profile-card" key={user._id}>

         

         <h2>{user.username}</h2>


        <div className="profiles-stats">

         <span> {user.followers?.length || 0} Followers </span>
                               
         <span>  {user.following?.length || 0} Following   </span>               

        </div> 
           <Link to={`/profiles/${user._id}`}>
    View Profile
</Link>
                             
  </div>
       ))}

       </div>
  


    </main>
)


}


export default AllProfiles 
