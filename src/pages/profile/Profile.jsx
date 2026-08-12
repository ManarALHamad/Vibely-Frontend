// here the user can view their username, profile photo, posts(images and videoes)

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import * as userService from "../../services/user"

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

const [profileUser, setProfileUser] = useState(props.user)

const handleFollow = async () => {

    const updatedUser = await userService.toggleFollow(profileUser._id)

    setProfileUser(updatedUser)
}


return (

<main className="profile-page">

 {/* PROFILE HEADER */}
 <section className="profile-header">

  <div className="profile-picture">

   <img src={props.user.profileImage || "https://i.pravatar.cc/150" }alt={props.user.username} />
                            
 
 </div>

   <div className="profile-info">

      <h1 className="profile-username">
        {props.user.username}
    </h1>

      <div className="profile-stats">

      <div>
       {myPosts.length}
      <span>Posts</span>
        </div>

         <div>
          0
        <span>Followers</span>

          </div>

         <div>
          0
        <span>Following</span>
        </div>

        </div>

         <div className="profile-actions">

         <Link to="/posts/new">
           <button>Create Post</button>
         </Link>
         
        {profileUser._id !== props.user._id && (

    <button onClick={handleFollow}>
        {isFollowing ? "Unfollow" : "Follow"}
    </button>

)}

         </div>

         </div>

            </section>


    {/* POSTS SECTION */}

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

            // video not yet

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