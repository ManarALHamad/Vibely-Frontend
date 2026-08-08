//post form (image)
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const PostForm = (props) => {

const navigate = useNavigate()

const initialState ={

    mediaType: "image",
    mediaUrl: "",
    caption: "",
    category: "",

}

const [formData, setFormData] = useState(initialState)


 const handleChange = (event) => {
  setFormData({...formData,[event.target.name]: event.target.value})

    }
const handleSubmit = async (event) => {
        event.preventDefault()

        await props.addPost(formData)

        setFormData(initialState)

        navigate("/posts")
    }


return(

    <main>

        <h2>Create a post</h2>

        <form onSubmit={handleSubmit}>

        Media Type:

        <select name="mediaType" value={formData.mediaType} onChange={handleChange}>

              <option value="image">Image</option>
              <option value="video">Video</option>     
        </select>   

        Media URL:

        <input type="url" name="mediaUrl" value={formData.mediaUrl} onChange={handleChange} placeholder="https://..."   />

        Caption:

        <textarea name="caption" value={formData.caption} onChange={handleChange} />

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

        <button type="submit"> Publish </button>

        </form>

    </main>


)



}

export default PostForm
