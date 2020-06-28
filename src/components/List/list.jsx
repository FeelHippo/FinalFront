import React from 'react';

export default function List({ items, renderItem, order = false }) {

    // limit output to 10 elements
    let recent = order ? items.reverse().slice(0, 10) : items.slice(0, 10);

    return (
        <ul className="adsList">
            {recent.map(item => (
                <li key={item._id} style={{ listStyleType: "none" }}>
                    {renderItem(item)}
                </li>
            ))}
        </ul>
    )
}