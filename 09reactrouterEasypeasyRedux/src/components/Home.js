import React from 'react'
import Feed from './Feed';
import { useStoreState } from 'easy-peasy';

const Home = ({ isLoading, fetchError }) => {
    const searchResult = useStoreState((state) => state.searchResult);

    return (
        <main className="Home">
            {isLoading && <p className="statusMsg">Loading posts...</p>}
            {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
            {!isLoading && !fetchError && (
                searchResult.length ? (
                    <Feed posts={searchResult} />
                ) : (
                    <p style={{ marginTop: "2rem" }}>No posts to display</p>
                )
            )}
        </main>
    )
}

export default Home