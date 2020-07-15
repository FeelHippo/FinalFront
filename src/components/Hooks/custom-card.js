import React from 'react';
import { Link } from 'react-router-dom';

export const Card = ({ _id, name, price, tag, description, photo }) => {
    return (
        <Link to={`/detail/${_id}`}>
            <section>
                <div>
                    <h3>{name}</h3>
                    <p>{price} Euro</p>
                    <p>"{tag}: {description ? description : null}"</p>
                    <img src={'http://localhost:5000/api/photo/' + photo} alt={name}/>
                </div>
            </section>
        </Link>
    )
}