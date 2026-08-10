import { useState } from "react"

const CommentForm = (props) => {

    const initialState = {
        content: ""
    }

    const [formData, setFormData] = useState(initialState)

    const handleChange = (event) => {

        setFormData({...formData,[event.target.name]: event.target.value })
        
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        await props.addComment(
            
            props.postId,
            formData
        )

        setFormData(initialState)
    }

    return (

        <form onSubmit={handleSubmit}>

            <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Write a comment..." />
        

            <button type="submit"> Post Comment</button>
               
            

        </form>

    )
}

export default CommentForm