import React from 'react';
import { Link } from 'react-router-dom';

export const Card = ({ _id, name, price, tag, description, photo }) => {
    return (
        <Link to={`/detail/${_id}`}>
            <section class="nes-container is-rounded is-dark">
                <div class="nes-container is-rounded">
                    <h3>{name}</h3>
                    <p>{price} Euro</p>
                    <p>"{tag}: {description ? description : null}"</p>
                    <img src={photo} alt={name}/>
                </div>
            </section>
        </Link>
    )
}