// here the user can view their username, profile photo, posts(images and videoes)

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Profile = (props) => {

const [myPosts, setMyPosts] = useState([])

useEffect(() => {

    const userPosts = props.posts.filter((post) => {

        const authorId =
            typeof post.author === "object"
                ? post.author?._id
                : post.author

        return authorId === props.user?._id
    })

    setMyPosts(userPosts)

}, [props.posts, props.user])



return (
  
  <main>

<h1>My Profile</h1>

<img src={props.user.profileImage} alt={props.user.username} width="150" />
                
<h2>{props.user.username}</h2>                
                
<h3>My Posts</h3>

{myPosts.length === 0 ? (

  <p>No posts yet.</p> ) : (

 myPosts.map((post) => (           
               
<div key={post._id}>
                    
 {post.mediaType === "image" ? (
                       
  <img src={post.mediaUrl} alt={post.caption} width="300"  />

  ) : (
 <video src={post.mediaUrl} controls width="300"/>
                           
   )}                               
                                
  <h3>{post.caption}</h3>           

  <p>{post.category}</p>                  

  <Link to={`/posts/${post._id}`}>  View  </Link>   {" | "}               

  <Link to={`/posts/${post._id}/edit`}>  Edit </Link>
                                            
      </div>                      
                        

     
                ))

            )}
                  

 
  </main>





)



}

export default Profile