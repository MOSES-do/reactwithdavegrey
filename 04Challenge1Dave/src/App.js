import { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';


const App = () => {
  const API_URL = 'http://jsonplaceholder.typicode.com/';
  const [reqType, setReqType] = useState('users');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}${reqType}`);
        const data = await response.json();
        console.log(data);
        setItems(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchItems();
  }, [reqType])



  return (
    <div className="App">
      <Form reqType={reqType} setReqType={setReqType} />
      <List items={items} reqType={reqType} setReqType={setReqType} />
    </div>
  )

}

export default App;