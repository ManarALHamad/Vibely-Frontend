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

    fetchAllProducts()
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
        <Route path='/' element={user ? <Dashboard user={user} /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
        <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />
        <Route path="/posts/new" element={ <PostForm />} />
        <Route path="/posts/:postId" element={<PostDetails posts={posts} isLoading={isLoading} deletePost={deletePost} />} />
      </Routes>

     
      </main>
    </div>
  )
}

export default App