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

const handleFollow = async (userId) => {

        try {

            const updatedUser = await userService.toggleFollow(userId)

            const updatedUsers = allUsers.map((user) => {

                if (user._id === userId) {
                    return updatedUser
                }

                return user
            })

            setAllUsers(updatedUsers)

        } catch (error) {

            console.log(error)
        }
    }

return (

<main className="profiles-page">

<h1>All Profiles</h1>

<div className="profiles-container">

{allUsers.map((user) => {



const isFollowing = user.followers?.some((follower) => {

     const followerId =
     typeof follower === "object"
     ? follower._id
     : follower

    return followerId === props.user?._id
     })


   return (

     <div className="profile-card"key={user._id} >
                            
                            
    <h2>{user.username}</h2>


    <div className="profiles-stats">

    <span> {user.followers?.length || 0} Followers </span>
                                   
                            
    <span>{user.following?.length || 0} Following </span>
                                    
                               

     </div>


     {/* <Link to={`/profiles/${user._id}`}>  View Profile</Link> */}
                              
                            
    {/* don't follow yourself */}

     {user._id !== props.user?._id && (

      <button   onClick={() => handleFollow(user._id)}> {isFollowing  ? "Unfollow"  : "Follow"} </button>                      
                                   
 

     )}

     </div>

        )

        })}

            </div>

        </main>
    )
}


export default AllProfiles 
