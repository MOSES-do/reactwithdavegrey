import React from 'react'
import LineItem from './LineItem'


const ItemsList = ({ items, handleCheck, handleDelete }) => {
    return (
        <ul>
            {items.map((item) => {
                return <LineItem
                    key={item.id}
                    item={item}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete} />
            })}

            {/* <p onClick={handleNameChange}>Hello {name}</p> */}
            {/* <button onClick={handleClick}>Click it</button>
                    <button onClick={() => handleClick2('Moses')}>Click it</button>
                    <button onClick={(e) => handleClick3(e)}>Click it</button> */}
        </ul>
    )
}


export default ItemsList;