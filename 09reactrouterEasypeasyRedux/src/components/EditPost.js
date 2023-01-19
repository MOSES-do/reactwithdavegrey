import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom'; //navigate back to homepage
import { useStoreState, useStoreActions } from 'easy-peasy';


const EditPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const editPostTitle = useStoreState((state) => state.editPostTitle);
    const editPostBody = useStoreState((state) => state.editPostBody);

    const editPost = useStoreActions((actions) => actions.editPost);
    const setEditPostTitle = useStoreActions((actions) => actions.setEditPostTitle);
    const setEditPostBody = useStoreActions((actions) => actions.setEditPostBody);

    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id);

    useEffect(() => {
        if (post) {
            //this prefills the edit page on click
            setEditPostTitle(post.title);
            setEditPostBody(post.body);
        }
    }, [post, setEditPostTitle, setEditPostBody])

    const handleEdit = (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, title: editPostTitle, datetime, body: editPostBody }
        editPost(updatedPost);
        navigate(`/post/${id}`);
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
                        <button type="button" onClick={() => handleEdit(post.id)}>Submit</button>
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