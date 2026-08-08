
import { Link } from "react-router-dom"


const PostList = (props) => {

    if (props.isLoading) {
        return <p>Loading posts...</p>
    }

    return (
        <main>
     <h2>All Posts</h2>

    {props.posts.map((post) => (
     
     <div key={post._id}>

      {post.mediaType === "image" ? (
        <img src={post.mediaUrl} alt={post.caption}width="300"/> ) : (
        <video  src={post.mediaUrl} controls width="300"/>)}
              
         <h3>{post.caption}</h3>            
         <p>{post.category}</p>
         </div>
                   
        ))} 
                
                    


        </main>
    )
}

export default PostList