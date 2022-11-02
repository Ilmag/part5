import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import userService from '../services/users'

const Blog = ({ blog, addLikes, removeBlog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const buttonStyle = {
        backgroundColor: 'red',
        color: 'white'
    }

    const [visible,setVisible] = useState(false)
    const [name,setName] = useState('')

    useEffect(() => {
        userService.getAll().then((response) => {
            const allUsers = response
            const user = allUsers.filter(u => u.id === blog.user[0])[0]
            setName(user.name)
        })
    }, [])

    const showDetails = { display: visible ? '' : 'none' }

    const toggleDetails = () => {
        setVisible(!visible)
    }

    const handleLikes = async () => {
        const updated = { ...blog,likes:blog.likes + 1 }
        await addLikes(blog.id,updated)
    }

    const handleBlogRemove = async (blog) => {
        await removeBlog(blog)
    }

    return (
        <div style={blogStyle}>
            <div className="title-author">
                <span id="title">{ blog.title }</span> <span id="author">{ blog.author }</span>
                < button onClick={toggleDetails} id="show-button"> {visible ? 'hide' : 'view'} </button>
            </div>
            <div style={showDetails} id="url-likes">
                <div className="url">
                    {blog.url}
                </div>
                <div className="likes">
          likes: {blog.likes} <button id="like-button" onClick={handleLikes}>like</button>
                </div>
                <div className="creator">
          created by: {name}
                </div>
                <div className="remove-button">
                    <button id="remove-button" style={buttonStyle} onClick={() => handleBlogRemove(blog)}>remove</button>
                </div>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    addLikes: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired
}

export default Blog