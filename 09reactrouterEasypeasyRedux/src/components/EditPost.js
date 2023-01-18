import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom'
import DataContext from '../context/DataContext';
import { format } from 'date-fns';
import api from '../api/posts';
import { useNavigate } from 'react-router-dom'; //navigate back to homepage

const EditPost = () => {
    const [editPostTitle, setEditPostTitle] = useState('');
    const [editPostBody, setEditPostBody] = useState('');
    const { posts, setPosts } = useContext(DataContext);
    const navigate = useNavigate();

    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    useEffect(() => {
        if (post) {
            //this prefills the edit page on click
            setEditPostTitle(post.title);
            setEditPostBody(post.body);
        }
    }, [post, setEditPostTitle, setEditPostBody])

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, title: editPostTitle, datetime, body: editPostBody }

        try {
            const response = await api.put(`/posts/${id}`, updatedPost);
            setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
            setEditPostTitle('');
            setEditPostBody('');
            navigate('/');
        } catch (err) {
            console.log(`Error:${err.message}`);
        }
    }

    return (
        <main className="NewPost">
            {editPostTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={editPostTitle}
                            onChange={(e) => setEditPostTitle(e.target.value)}
                        />

                        <label htmlFor="postBody">Post</label>
                        <textarea
                            id="postBody"
                            required
                            value={editPostBody}
                            onChange={(e) => setEditPostBody(e.target.value)}
                        />
                        <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {
                !editPostTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing</p>
                    <p>
                        <Link to='/'>Visit our Homepage</Link>
                    </p>
                </>
            }

        </main>
    )
}

export default EditPost