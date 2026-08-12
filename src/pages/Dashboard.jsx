import { useEffect, useState } from "react"
import PostList from "./posts/PostList"
import * as userService from '../services/user'


const Dashboard = (props) => {


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