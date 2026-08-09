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
import * as postService from './services/posts'
import Profile from './pages/profile/Profile'
import PostList from "./pages/posts/PostList"
import UpdatePost from "./pages/posts/UpdatePost"



const getUserFromToken = () => {
  const token = localStorage.getItem('token')

  if (!token) return null

  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {

  const [user, setUser] = useState(getUserFromToken())
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
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

    fetchAllPosts()
  }, [])

const addPost = async (formData) => {
  const newPost = await postService.create(formData)

  setPosts([...posts, newPost])
}

const deletePost = async (postId) => {
  await postService.deletePost(postId)

  const filteredPosts = posts.filter(
    (post) => post._id !== postId
  )

  setPosts(filteredPosts)
}

const updatePost = async (postId, formData) => {
  const updatedPost = await postService.update(postId, formData)

  const updatedPostsArray = posts.map((post) => {
    return post._id === postId ? updatedPost : post
  })

  setPosts(updatedPostsArray)
}



  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
      <Routes>
      <Route path="/" element={user ? (<Dashboard user={user} posts={posts} isLoading={isLoading} />   ) : (<Landing />) } />
      <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
      <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />
      <Route path="/posts/new" element={ <PostForm addPost={addPost} />} />
      <Route path="/posts/:postId" element={<PostDetails posts={posts} isLoading={isLoading} deletePost={deletePost} />} />
      <Route path="/profile" element={<Profile user={user} posts={posts} />} />
      <Route path="/posts" element={<PostList posts={posts} isLoading={isLoading} /> }/>
      <Route path="/posts/:postId/edit"element={<UpdatePost posts={posts} updatePost={updatePost} />} />
    
    
 
  

    
   
      </Routes>

     
      </main>
    </div>
  )
}

export default App