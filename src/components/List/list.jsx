import React from 'react';

export default function List({ items, renderItem }) {
    return (
        <ul className="adsList">
            {items.map(item => (
                <li key={item._id} style={{ listStyleType: "none" }}>
                    {renderItem(item)}
                </li>
            ))}
        </ul>
    )
}