import { useEffect, useState } from "react"
import { index } from '../services/user'
import PostList from "./posts/PostList"


const Dashboard = (props) => {

    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData =  await index()
            setAllUsers(usersData)
        }
        fetchUsers()
        
    }, [])

    return (

        <section>

         <header>
                <h1>Welcome {props.user.username}!</h1>
        </header>


        <section>

        <h2>Feed</h2>

        <PostList posts={props.posts} isLoading={props.isLoading} />
            
        </section>


        <section>

         <h2>View All Users</h2>

        {allUsers.map((user) => (

        <div className="card" key={user._id}>
     
        <h3>{user.username}  </h3>
          </div>                   
                      

                   

                ))}

            </section>

        </section>
    )
}

export default Dashboard