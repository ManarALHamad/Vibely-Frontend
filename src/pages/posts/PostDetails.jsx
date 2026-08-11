import { useParams, useNavigate, Link } from "react-router-dom"
import CommentForm from "../comments/CommentForm"



const PostDetails = (props) => {

   const { postId }  = useParams()
   const navigate = useNavigate()



 const post = props.posts.find((post) => {
        return post._id === postId
    })

 if (props.isLoading) {
        return <p>Loading posts...</p>
    }

if (!post) {
        return <h2>Post not found.</h2>
    }

const handleDelete = async () => {
        await props.deletePost(postId)
        navigate('/posts')
    }


// only owner can see deleteButton and add Button other user only can write comment

   const isOwner = post.author?._id === props.user?._id
 


return (

   <main>

            <h2>{post.caption}</h2>

            { post.mediaType === "image"? <img src={post.mediaUrl} alt={post.caption} width="400" /> :
        
            <video src={post.mediaUrl} controls width="400"/> }
                  
            <p>Category: {post.category}</p>

            <p> Posted by:{post.author.username}</p>


            {isOwner && (

                <>

                <button onClick={handleDelete}> Delete Post</button>

                 <Link to={`/posts/${postId}/edit`}> Edit Post</Link>
                
                </>
            )


            }

            
            <CommentForm
             postId={post._id}
             addComment={props.addComment}

               />

            {/* Display the comments under the post    */}

            <h3>Comments</h3>

       {props.comments.filter((comment) => comment.post === post._id) .map((comment) => (
       
       <div key={comment._id}>
   
       <p>{comment.author?.username} </p>
       <p>{comment.content}</p>

        </div>
       
    ))}

        </main>
)

}

export default PostDetails