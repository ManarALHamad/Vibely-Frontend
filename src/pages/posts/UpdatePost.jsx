//edit a post the form shall show again

import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const UpdatePost = (props) => {

    const navigate = useNavigate()
    const { postId } = useParams()

    const post = props.posts.find((post) => {
        return post._id === postId
    })

    const [formData, setFormData] = useState({

        mediaType: post.mediaType,
        mediaUrl: post.mediaUrl,
        caption: post.caption,
        category: post.category,
    })

    const handleChange = (event) => {
        setFormData({...formData,[event.target.name]: event.target.value,}) 
        
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        await props.updatePost(postId, formData)

        navigate(`/posts/${postId}`)
    }

    return (
        <main>

            <h2>Edit Post</h2>

            <form onSubmit={handleSubmit}>

                Media Type:

                <select name="mediaType"value={formData.mediaType} onChange={handleChange}>
                <option value="image">Image</option>   
                <option value="video">Video</option>   
                </select>   
               Media URL: 
            
                <input type="url" name="mediaUrl" value={formData.mediaUrl} onChange={handleChange}/>
            
               Caption: 
               
               <textarea name="caption" value={formData.caption}onChange={handleChange} />

              Category:

        <select name="category" value={formData.category} onChange={handleChange} >
            
             <option value="">Select a category</option>
             <option value="fashion">Fashion</option>
             <option value="food">Food</option>
             <option value="travel">Travel</option>
             <option value="technology">Technology</option>
             <option value="education">Education</option>
             <option value="comedy">Comedy</option>
             <option value="lifestyle">Lifestyle</option>
             <option value="other">Other</option>
        </select>                    


        <button type="submit">Save Changes </button>
                    
               

            </form>

        </main>
    )
}

export default UpdatePost

