import Nav from "./components/Nav"
import SignUpForm from "./pages/SignUpForm"
import './App.css'
import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from 'react'
import SignInForm from "./pages/SignInForm"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import PostForm from "./pages/posts/PostForm"
import PostDetails from "./pages/posts/PostDetails"
import * as postService from './services/postService'
import Profile from './pages/profile/Profile'
import PostList from "./pages/posts/PostList"
import UpdatePost from "./pages/posts/UpdatePost"
import * as commentService from './services/commentService'
import CommentForm from "./pages/comments/CommentForm"
import AllProfiles from "./pages/profile/AllProfiles"



const getUserFromToken = () => {
  const token = localStorage.getItem('token')

  if (!token) return null

  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {

  const [user, setUser] = useState(getUserFromToken())
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [comments, setComments] = useState([])

  //posts

 useEffect(() => {

    const fetchAllPosts = async () => {

      try {

        const postsData = await postService.index()
        setPosts(postsData)

      } catch (error) {

        console.log(error)

      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchAllPosts()
    }

    
  }, [user])



useEffect(() => {

  const fetchAllComments = async () => {

    try {

      const commentsData = await commentService.index()

      // console.log("COMMENTS FROM DATABASE:", commentsData)

      setComments(commentsData)
      
    } catch (error) {

      console.log(error)
      
    }
  }

  if(user) {

    fetchAllComments()
  }

}, [user])



const addPost = async (formData) => {

  const newPost = await postService.create(formData)

  // newest posts will appear first

  setPosts([newPost, ...posts])

}

const deletePost = async (postId) => {

    await postService.deletePost(postId)

    const filteredPosts = posts.filter((post) => {
        return post._id !== postId
    })

    setPosts(filteredPosts)
}

const updatePost = async (postId, formData) => {
  const updatedPost = await postService.update(postId, formData)

  const updatedPostsArray = posts.map((post) => {
    return post._id === postId ? updatedPost : post
  })

  setPosts(updatedPostsArray)
}

//comments

const addComment = async (postId, formData) => {

    const newComment = await commentService.create(postId,formData)
       
    setComments([...comments, newComment])

}

//delete comment

const deleteComment = async (commentId) => {

  await commentService.deleteComment(commentId)

  const filteredComments = comments.filter((comment) => {
    return comment._id !== commentId
    })

    setComments(filteredComments)


}

//update comment

const updateComment = async (commentId, formData) => {

  const updatedComment = await commentService.update(commentId, formData)

    const updatedComments = comments.map((comment) => {

     if (comment._id === commentId) {
     return updatedComment
        }

        return comment
    })

    setComments(updatedComments)
}



//posts likes 

const toggleLike = async (postId) => {

  const updatedPost = await postService.toggleLike(postId)

  const updatedPosts = posts.map((post) =>{

   if (post._id === postId) {
     return updatedPost
   }

    return post

  })

  setPosts(updatedPosts)

}



  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
      <Routes>
      <Route path="/" element={user ? (<Dashboard user={user} posts={posts} toggleLike={toggleLike} isLoading={isLoading} />   ) : (<Landing />) } />
      <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
      <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />
      <Route path="/posts/new" element={ <PostForm addPost={addPost} />} />
      <Route path="/posts/:postId" element={<PostDetails posts={posts} comments={comments} addComment={addComment} updateComment={updateComment} deleteComment={deleteComment} deletePost={deletePost} user={user} isLoading={isLoading}  />} />
      <Route path="/profile" element={<Profile user={user} posts={posts} />} />
      <Route path="/posts" element={<PostList posts={posts}  user={user}  toggleLike={toggleLike} isLoading={isLoading} /> }/>
      <Route path="/posts/:postId/edit"element={<UpdatePost posts={posts} updatePost={updatePost} />} />
      <Route path="/profiles" element={<AllProfiles user={user} />} />
      <Route path="/profiles/:userId" element={<Profile user={user} posts={posts} />}  />

  
    
   
      </Routes>

     
      </main>
    </div>
  )
}

export default App