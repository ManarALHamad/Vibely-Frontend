
import { Link } from "react-router-dom"


const PostList = (props) => {

    if (props.isLoading) {
        return <p>Loading posts...</p>
    }

   return (
    <main>

     <h2>All Posts</h2>

      {props.posts.map((post) => {

    const isLiked = post.likes?.some(
        (like) => like._id === props.user._id
    )

       return (

         <div key={post._id}>

         {/* post author */}

        <p>Posted By: {post.author?.username} </p>




        {post.mediaType === "image" ? (
        
        <img src={post.mediaUrl}alt={post.caption}width="300" />
                
        ) : (
        <video src={post.mediaUrl} controls  width="300"  />
     
         )}

         <h3>{post.caption}</h3>
         <p>{post.category}</p>
                
        {/* like button ♥️ */}

        <button  onClick={() => props.toggleLike(post._id)} > {isLiked ? "❤️" : "🤍"}  </button>        


        <span> {post.likes?.length || 0} likes </span>


        {/* who liked it */}

         {post.likes?.length > 0 && (

          <p> Liked by:{" "}
          {post.likes.map((like) => {                      
          
          return like.username}).join(", ")} </p>
                                
             
             )}                       
                                
                           
        {/* post details  */}

        <Link to={`/posts/${post._id}`}> View Post </Link>
                           
                       

         </div>

          )

            })}

        </main>
    )
    

     
    
}

export default PostList