import React from 'react'

const Header = ({ setReqUrl }) => {
    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <button onClick={() => setReqUrl('comments')} className='comment'>Comments</button>
                <button onClick={() => setReqUrl('users')} className='user'>Users</button>
                <button onClick={() => setReqUrl('posts')} className='post'>Posts</button>
            </form>
        </div>
    )
}

export default Header