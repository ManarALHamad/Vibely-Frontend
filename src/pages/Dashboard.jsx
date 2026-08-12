import { useEffect, useState } from "react"
// import { index } from '../services/user'
import PostList from "./posts/PostList"
import * as userService from '../services/user'


const Dashboard = (props) => {

    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData =  await userService.index()
            setAllUsers(usersData)
        }
        fetchUsers()
        
    }, [])

    const handleFollow = async (userId) => {

    const updatedUser = await userService.toggleFollow(userId)

    const updatedUsers = allUsers.map((user) => {

        if (user._id === userId) {
            return updatedUser
        }

        return user
    })

    setAllUsers(updatedUsers)
}

    return (

        <section>

         <header>
                <h1>Welcome {props.user.username}!</h1>
        </header>

      
        <section>

        <h2>Feed</h2>

        <PostList posts={props.posts} isLoading={props.isLoading} user={props.user} toggleLike={props.toggleLike} />
            
        </section>


        <section>

    {allUsers.map((user) => {

    const isFollowing = user.followers?.some((follower) => {
        return follower._id === props.user._id
    })

    return (

    <div className="card" key={user._id}>

    <h3>{user.username}</h3>

    <p>{user.followers?.length || 0} Followers</p>
                
          

           
     {user._id !== props.user._id && (
            
    <button onClick={() => handleFollow(user._id)}>{isFollowing ? "Unfollow" : "Follow"} </button>
 
            )}

        </div>

    )

})}

            </section>

        </section>
    )
}

export default Dashboard