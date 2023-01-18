import React from 'react'
import ListItem from './ListItem';
const Posts = ({ data, fetchError, setFetchError }) => {


    return (
        <div className="header3">
            <ol>
                {data.map((item) => (
                    <ListItem key={item.id} item={item} />
                ))
                }
            </ol>
        </div>
    )
}

export default Posts