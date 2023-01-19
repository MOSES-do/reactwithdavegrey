import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'

const EditPost = ({ posts, handleEdit, editPostBody, setEditPostBody, editPostTitle, setEditPostTitle }) => {

    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    useEffect(() => {
        if (post) {
            //this prefills the edit page on click
            setEditPostTitle(post.title);
            setEditPostBody(post.body);
        }
    }, [post, setEditPostTitle, setEditPostBody])

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