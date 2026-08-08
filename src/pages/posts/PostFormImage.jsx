//post form (image)
import { useState } from "react"
import { useNavigate } from "react-router"

const PostFormImage = (props) => {

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

            

        </form>




    </main>




)




}

export default PostFormImage
