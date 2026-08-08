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



}

export default PostDetails