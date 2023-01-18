import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header'
import SearchItem from './components/SearchItem'
import AddItem from './components/AddItem'
import Content from './components/Content'
import Footer from './components/Footer'
import apiRequest from './components/apiRequest';


function App() {

  const API_URL = 'http://localhost:3500/items';

  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState('');//handle form

  const [search, setSearch] = useState('');

  //fetch error with state
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expected data');
        const listItems = await response.json();
        // console.log(listItems);
        setItems(listItems);
        //if a successful request, setFetchError to null
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      }
      // Check if page is still loading or not
      finally {
        setIsLoading(false);
      }
    }

    //don't use in real app this is to simulate a slow load time.
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000)
  }, [])



  const handleCheck = async (id) => {
    // console.log(`key: ${id}`)
    const listItems =
      items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);

    //Save checked state in API Database (UPDATE)
    const myItem = listItems.filter(item => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  }

  const handleDelete = async (id) => {
    console.log(id);
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    //handleDelete in Database
    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  }

  const addNewItem = async (item) => {//update items list in state
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);


    //CRUD {Create, Update, Delete}
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  }

  const handleSubmit = (e) => {//handle form 
    e.preventDefault();
    if (!newItem) return;  //if no new item
    //addItem
    addNewItem(newItem);
    setNewItem('')//After adding i=new item we set satae back to empty
  }




  return (
    <div className="App">
      <Header title={'Grocery List'} />

      <AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />

      <SearchItem search={search} setSearch={setSearch} />

      <div className="main">
        {/* if is loading is true */}
        {isLoading && <p>Loading Items...</p>}
        {/* use fetchError above content */}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && < Content items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))} handleCheck={handleCheck} handleDelete={handleDelete} />}
      </div>

      <Footer length={items.length} />
    </div>
  );
}

export default App;
