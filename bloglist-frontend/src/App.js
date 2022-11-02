import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Add from './components/Add'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])


    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async(event) => {
        event.preventDefault()

        try {
            const user = await loginService.login(username, password)

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            setNotification(`user ${user.username} logged in`)
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        } catch (exception) {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            console.log(exception)
        }
    }

    const handleLogout = () => {
        setNotification(`user ${user.name} logged out`)
        setUser(null)
        window.localStorage.clear()
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const addBlog = (newBlog) => {
        blogService.create(newBlog).then(returnedBlog => {
            setBlogs(blogs.concat(returnedBlog))
            setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        })
    }

    const blogsRef = useRef()

    const addLikes = async (id,update) => {
        try{
            await blogService.update(id,update)
            const blogsAfterUpdate = blogs.map(blog => blog.id !== id ? blog : update)
            setBlogs(blogsAfterUpdate)
        }catch(exception){
            console.log(exception)
        }
    }

    const removeBlog = async (blog) => {
        if(window.confirm(`Remov blog ${blog.title} by ${blog.author}`)){
            try{
                await blogService.remove(blog.id)
                const blogsAfterRemoval = blogs.filter(b => b.id !== blog.id)
                setBlogs(blogsAfterRemoval)
                setNotification(`blog ${blog.title} by ${blog.author} was removed`)
                setTimeout(() => {
                    setNotification(null)
                },5000)
            }catch(exception){
                console.log(exception.message)
                setErrorMessage(exception.message)
                setTimeout(() => {
                    setErrorMessage(null)
                },5000)
            }
        }
    }

    blogs.sort((a,b) => b.likes - a.likes)

    return (
        <div >
            <Notification notification = { notification }/>
            <ErrorMessage errorMessage = { errorMessage }/>
            <h2>blogs</h2>

            {user === null ?
                <Login
                    handleLogin = { handleLogin }
                    username = { username }
                    password = { password }
                    setUsername = { setUsername }
                    setPassword = { setPassword }
                // eslint-disable-next-line no-trailing-spaces
                /> : 
                <div>
                    <p>{user.name} is logged in. <button id="logout-button" onClick = { handleLogout } > logout </button></p >
                    <Togglable buttonLabel = 'create new blog'ref = { blogsRef } >
                        <Add createBlog = { addBlog }/>
                    </Togglable>
                </div>
            }

            {blogs.map(blog =>
                <Blog key = {blog.id} blog = {blog} addLikes={addLikes} removeBlog={removeBlog}/>
            )
            }

        </div>
    )
}

export default App