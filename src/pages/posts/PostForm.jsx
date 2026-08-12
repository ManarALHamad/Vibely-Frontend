//post form (image)
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import UploadWidget from "../../components/UploadWidget"

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



const handleUpload =(url, type) => {


    setFormData((previousData) => ({
        ...previousData,
        mediaUrl: url,
        mediaType: type
    }))

}



const handleSubmit = async (event) => {

        event.preventDefault()

        await props.addPost(formData)

        setFormData(initialState)

        navigate("/")
    }


return (


<main className="create-post-page">

<div className="create-post-container">

<div className="create-post-heading">

<h1>Create Post</h1>

 <p>Share a photo or video with the Vibely community </p>
                        
</div>

<form className="create-post-form" onSubmit={handleSubmit}   >
                   
 
<div className="upload-section">

<div className="upload-area">

 {formData.mediaUrl ? ( <div className="upload-preview">

{formData.mediaType === "image" ? (

<img src={formData.mediaUrl} alt="Preview"   />
                                            

 ) : (

 <video src={formData.mediaUrl} controls  />

 )}

 </div>  ) : (

  <div className="upload-placeholder">                         

<div className="upload-icon">↑ </div>
  
  <h3>Select media to upload</h3>

    <p>   Share a photo or video </p>
                                     

</div>

 )}

    </div>


<UploadWidget handleUpload={handleUpload}   />
 
</div>

<div className="post-form-details">

<div className="post-form-field">

Media Type

<select name="mediaType" value={formData.mediaType} onChange={handleChange}>

<option value="image"> Image </option>
                                   
<option value="video"> Video </option>
                                   
 </select>

 </div>


  <div className="post-form-field">

  Caption

<textarea name="caption" value={formData.caption} onChange={handleChange}  placeholder="Write a caption..." />
   

 </div>

 <div className="post-form-field">

Category

 <select name="category" value={formData.category} onChange={handleChange}>
         

<option value="">Select a category </option>
                                    
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


    <div className="post-form-buttons">

    <button  type="button" className="post-cancel-button"onClick={() => navigate("/")}> Cancel </button>
 
    <button  type="submit" className="post-publish-button">  Publish </button>
                              
 
    </div>

    </div>

                </form>

            </div>

        </main>
    )



}

export default PostForm
