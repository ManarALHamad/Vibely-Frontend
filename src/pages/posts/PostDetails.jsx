import { useParams, useNavigate, Link } from "react-router-dom"

const { postId }  = useParams()
const navigate = useNavigate()


const PostDetails = (props) => {

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
        await props.deleteProduct(postId)
        navigate('/posts')
    }

return (

   <main>

            <h2>{post.caption}</h2>

            { post.mediaType === "image"? <img src={post.mediaUrl} alt={post.caption} width="400" /> :
        
            <video src={post.mediaUrl} controls width="400"/> }
                  
            <p>Category: {post.category}</p>

            <p> Posted by:{post.author.username}</p>

            <button onClick={handleDelete}> Delete Post</button>
               

            <Link to={`/posts/${postId}/edit`}> Edit Post</Link>
               
            

        </main>
)

}

export default PostDetails