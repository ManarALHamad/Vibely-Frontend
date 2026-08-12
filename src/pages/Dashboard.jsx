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


       

        </section>
    )
}

export default Dashboard