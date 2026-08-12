import { Link } from "react-router-dom"


const PostList = (props) => {

    if (props.isLoading) {
        return <p>Loading posts...</p>
    }

    return (

        <main className="post-list">

         <h2>All Posts</h2>

        {props.posts.map((post) => {

        const isLiked = post.likes?.some(
        
            (like) => like._id === props.user._id
        )

       return (

        <div className="post-card" key={post._id}>

          <p className="post-author">
          Posted By: {post.author?.username}  </p>

          {post.mediaUrl && (

          <div className="post-media">

             {post.mediaType === "image" ? (

              <img src={post.mediaUrl} width="300" />
      

            ) : (

              <video src={post.mediaUrl} controls  width="300"  />
 
            )}

                </div>
               )}


                        <div className="post-content">

                            <h3 className="post-caption">
                                {post.caption}
                            </h3>

                            <p className="post-category">
                                {post.category}
                            </p>

                            <div className="post-actions">

                                <button
                                    className="like-button"
                                    onClick={() => props.toggleLike(post._id)}
                                >
                                    {isLiked ? "❤️" : "🤍"}
                                </button>

                                <span className="like-count">
                                    {post.likes?.length || 0} likes
                                </span>

                            </div>


                            {post.likes?.length > 0 && (

                                <p className="liked-by">
                                    Liked by:{" "}

                                    {post.likes.map((like) => {
                                        return like.username
                                    }).join(", ")}

                                </p>

                            )}


           <Link
           className="view-post"
             to={`/posts/${post._id}`}
                >
               View Post
              </Link>

             </div>

               </div>

                )

            })}

        </main>
    )
}

export default PostList