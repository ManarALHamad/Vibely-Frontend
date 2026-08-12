import { useParams, useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import CommentForm from "../comments/CommentForm"


const PostDetails = (props) => {

   const { postId }  = useParams()
   const navigate = useNavigate()

  
   const [editingCommentId, setEditingCommentId] = useState(null)
   const [editContent, setEditContent] = useState("")

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




 const isOwner = post.author?._id === props.user?._id
 

const handleEditComment = (comment) => {

    setEditingCommentId(comment._id)
    setEditContent(comment.content)
}



const handleUpdateComment = async (commentId) => { 

    await props.updateComment(commentId, {
     content: editContent    
})


setEditingCommentId(null)
setEditContent("")

}


return (

 <main className="post-details-page">

 <div className="post-details-card">


 <div className="post-details-media">

 {post.mediaType === "image" ? (

  <img src={post.mediaUrl} alt={post.caption} />  ) : (
                            
  <video src={post.mediaUrl} controls />
  
  )}

 </div>

 <div className="post-details-content">


 <div className="post-details-header">

<p className="post-details-author"> @{post.author.username}</p>

 <h2>{post.caption}</h2>

 <span className="post-details-category"> {post.category} </span>
 
  {isOwner && (

  <div className="post-owner-actions">

  <Link to={`/posts/${postId}/edit`} className="edit-post-button" > Edit Post </Link>

  <button onClick={handleDelete} className="delete-post-button">Delete  </button>


 </div>

 )}

 </div>

 <div className="post-comments">

 <h3>Comments</h3>

 <div className="comments-list">

    {props.comments .filter((comment) => {
                               
   const commentPostId =
                                   
   comment.post?._id || comment.post

  return commentPostId === post._id

   }) .map((comment) => {
                               

   const isCommentOwner =
  
   comment.author?._id === props.user?._id

     return (

      <div className="comment-item"  key={comment._id}>
  
     <p className="comment-author">  @{comment.author?.username} </p>
    
     {editingCommentId === comment._id ? (

     <div className="comment-edit">

      <input type="text" value={editContent} onChange={(event) =>setEditContent(event.target.value)} />


      <button onClick={() => handleUpdateComment(comment._id) } >Save</button>
                                                       
  
        </div>

           ) : (

         <p className="comment-content"> {comment.content} </p>
      
           )}


            {isCommentOwner && (

            <div className="comment-actions">

              <button onClick={() =>handleEditComment(comment)}>Edit </button>
       
              <button onClick={() => props.deleteComment(comment._id)}> Delete </button>
     

              </div>

              )}

              </div>

                )
             })}

                        </div>



        <div className="comment-form-container">

        <CommentForm
        
        postId={post._id}
        addComment={props.addComment} />
                           

                        </div>

                    </div>

                </div>

            </div>

        </main>
    )

}
    

export default PostDetails