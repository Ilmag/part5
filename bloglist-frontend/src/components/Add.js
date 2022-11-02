import { useState } from 'react'

const Add = (props) => {

    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [url,setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()

        const newBlog = {
            title:title,
            author:author,
            url:url
        }

        props.createBlog(newBlog)

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return(
        <div>
            <h2>create new</h2>
            <div>
                <form onSubmit={addBlog}>
                    <div>
              title:
                        <input
                            id="title"
                            type="text"
                            name='Title'
                            value={title}
                            placeholder='title'
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </div>
                    <div>
              author:
                        <input
                            id="author"
                            type="text"
                            name='Author'
                            value={author}
                            placeholder='author'
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </div>
                    <div>
              url:
                        <input
                            id="url-address"
                            type="text"
                            name='URL'
                            value={url}
                            placeholder='url address'
                            onChange={({ target }) => setUrl(target.value)}
                        />
                    </div>
                    <button id="create-blog" type='submit'>create</button>
                </form>
            </div>
        </div>
    )
}

export default Add