import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import About from './components/About';
import Missing from './components/Missing';
import EditPost from './components/EditPost';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';
function App() {

  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');


  useEffect(() => {
    setPosts(data);
  }, [data, setPosts])

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav />

      <Routes>
        <Route exact path="/" element={<Home fetchError={fetchError} isLoading={isLoading} />} />
        <Route path="/post" element={<NewPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
