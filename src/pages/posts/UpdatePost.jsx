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
    <main className="edit-post-page">

        <div className="edit-post-container">

        <div className="edit-post-heading">
        
        <h2>Edit Post</h2>
        <p>Update your post details</p>
            
            </div>

            <form className="edit-post-form" onSubmit={handleSubmit}>

                <div className="edit-post-preview">

                    {formData.mediaUrl && (
                        formData.mediaType === "image" ? (
                            <img
                                src={formData.mediaUrl}
                                alt={formData.caption}
                            />
                        ) : (
                            <video
                                src={formData.mediaUrl}
                                controls
                            />
                        )
                    )}

                </div>


                <div className="edit-post-details">

                    <div className="edit-post-field">
                        <label>Media Type</label>

                        <select
                            name="mediaType"
                            value={formData.mediaType}
                            onChange={handleChange}
                        >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>
                    </div>


                    <div className="edit-post-field">
                        <label>Media URL</label>

                        <input
                            type="url"
                            name="mediaUrl"
                            value={formData.mediaUrl}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="edit-post-field">
                        <label>Caption</label>

                        <textarea
                            name="caption"
                            value={formData.caption}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="edit-post-field">
                        <label>Category</label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
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
                    </div>


                    <button className="edit-post-save" type="submit">  Save Changes  </button>
                        
                        
                    
                      
                  

                </div>

            </form>

        </div>

    </main>
)
}

export default UpdatePost

