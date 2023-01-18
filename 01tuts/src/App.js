import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header'
import SearchItem from './components/SearchItem'
import AddItem from './components/AddItem'
import Content from './components/Content'
import Footer from './components/Footer'
import Challeng from './components/Challeng'
import Inputclr from './components/Inputclr'

function App() {
  //Placeholder to be able to pass default values, now whe ahve localStorage so we can remove this
  // const [items, setItems] = useState([
  //   {
  //     id: 1,
  //     checked: false,
  //     item: "One half pound bag of Cocoa Covered Almonds unsalted"
  //   },
  //   {
  //     id: 2,
  //     checked: false,
  //     item: "item 2",
  //   },
  //   {
  //     id: 3,
  //     checked: false,
  //     item: "item 3"
  //   }
  // ])

  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);


  const [newItem, setNewItem] = useState('');//handle form

  const [search, setSearch] = useState('');

  const [colorValue, setColorValue] = useState('');
  const [hexValue, setHexValue] = useState('');
  const [isDarkText, setIsDarkText] = useState(true);


  useEffect(() => {
    localStorage.setItem('shoppinglist', JSON.stringify(items));
  }, [items])


  const handleCheck = (id) => {
    // console.log(`key: ${id}`)
    const listItems =
      items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);
  }

  const handleDelete = (id) => {
    console.log(id);
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  }

  const addNewItem = (item) => {//update items list in state
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
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
      <Content items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))} handleCheck={handleCheck} handleDelete={handleDelete} />
      <Footer length={items.length} />

      <div className="boxEl">
        <Challeng colorValue={colorValue} hexValue={hexValue} isDarktext={isDarkText} />
        <Inputclr colorValue={colorValue} setColorValue={setColorValue}
          setHexValue={setHexValue}
          isDarktext={isDarkText}
          setIsDarkText={setIsDarkText}
        />
      </div>
    </div>
  );
}

export default App;
