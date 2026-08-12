
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import * as userService from "../../services/user"

const Profile = (props) => {

const [profileUser, setProfileUser] = useState(null)
const [myPosts, setMyPosts] = useState([])

useEffect(() => {

 const fetchProfileUser = async () => {

  try {

 const users = await userService.index()

const currentUser = users.find((user) => {
return user._id === props.user?._id
})

   setProfileUser(currentUser)

  } catch (error) {

 console.log(error)
            }
        }

        if (props.user) {
            fetchProfileUser()
        }

    }, [props.user])



useEffect(() => {

 if (!props.user) return

    const userPosts = props.posts.filter((post) => {

        const authorId =
          typeof post.author === "object"
          ? post.author?._id
          : post.author

        return authorId === props.user?._id
    })

    setMyPosts(userPosts)

}, [props.posts, props.user])

if (!profileUser) {
    return <p>Loading profile...</p>
}

return (

<main className="profile-page">


 <section className="profile-header">

  <div className="profile-picture">

   <img src={profileUser.profileImage} 
   alt={profileUser.username} />
                            
 
 </div>

   <div className="profile-info">

      <h1 className="profile-username">
        {profileUser.username}
    </h1>

      <div className="profile-stats">

      <div>
       {myPosts.length}
      <span>Posts</span>
        </div>

         <div>
          {profileUser.followers?.length || 0}
        <span>Followers</span>

          </div>

         <div>
          {profileUser.following?.length || 0}
        <span>Following</span>
        </div>

        </div>

         <div className="profile-actions">

         <Link to="/posts/new">
           <button>Create Post</button>
         </Link>
         
   

         </div>

         </div>

            </section>


   

    <section className="profile-posts">

     <h2>My Posts</h2>

    {myPosts.length === 0 ? (

     <div className="no-posts">

      <h3>No posts yet</h3>

      <p>Share your first post on Vibely!</p>

        <Link to="/posts/new"> Create Post</Link>
       
     </div>

     ) : (

      <div className="profile-post-grid">

      {myPosts.map((post) => (

        <Link to={`/posts/${post._id}`} key={post._id} className="profile-post">
    
         {post.mediaType === "image" ? (

         <img src={post.mediaUrl} alt={post.caption} width={300} />
                                        
        ) : (

  

         <video src={post.mediaUrl} />
                                        
                                   
     )}

        <div className="profile-post-info">
        <p>{post.caption}</p>
       <span> {post.category}</span>
                                    
        </div>

                                    

                              
      </Link>              

       ))}

    </div>

     )}

       </section>

        </main>
    )





}

export default Profile