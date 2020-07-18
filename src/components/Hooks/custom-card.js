import React from 'react';
import { Link } from 'react-router-dom';
import './card.scss'

export const Card = ({ _id, name, price, tag, description, photo }) => {
    return (
        <Link to={`/detail/${_id}`} className="cardContainer">
            <article className="card">
                <img src={'http://localhost:5000/api/photo/' + photo} alt={name}/>
                <footer className="cardFooter">
                    <h3>{name}</h3>
                    <p>Price: {price} $</p>
                    <p>"{description ? description : null}"</p>
                </footer>
            </article>
        </Link>
    )
}