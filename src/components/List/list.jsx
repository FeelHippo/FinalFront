import React from 'react';
import './list.scss'

export default function List({ items, renderItem, newFirst }) {
    // limit output to 10 elements
    let recent = newFirst==="old" ? items.reverse().slice(0, 9) : items.slice(0, 9);
    return (
        <ul className="adsList">
            {recent.map(item => (
                <li key={item._id} style={{ listStyleType: "none" }} className="singleCard">
                    {renderItem(item)}
                </li>
            ))}
        </ul>
    )
}