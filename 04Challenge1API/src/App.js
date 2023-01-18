import React, { useState, useEffect } from 'react';
import './App.css';
import Posts from './components/Posts'
import Table from './components/Table'
import Header from './components/Header'



const App = () => {
  const API_URL = 'http://jsonplaceholder.typicode.com/';
  //fetch error with state
  const [fetchError, setFetchError] = useState(null);

  const [reqUrl, setReqUrl] = useState('users');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}${reqUrl}`);
        const data = await response.json();
        // console.log(data);
        setData(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchItems();
  }, [reqUrl])


  console.log(data)

  return (
    <div className="App">
      <Header setReqUrl={setReqUrl} />
      {/* <Posts data={data} fetchError={fetchError} setFetchError={setFetchError} /> */}

      <Table data={data} />
    </div>
  );
}

export default App;
