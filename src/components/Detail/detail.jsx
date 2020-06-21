import React from 'react';
import { Link } from 'react-router-dom';

const PrintDetail = ({
    tags,
    _id,
    name,
    price,
    description,
    photo
}) => (
    <div>
        <section class="nes-container is-dark">
            <section class="message-list">
                <section>
                    <div class="nes-container is-rounded is-dark">
                        <p>Item: {name}</p>
                    </div>
                    <div class="nes-container is-rounded is-dark">
                        <p>Description: {description}</p>
                    </div>
                </section>
            </section>
        </section>
        <section>
            <section class="nes-container is-dark">
                <section class="message -left">
                    <div class="nes-container is-rounded is-dark">
                        <p>Tags: {tags.map(tag => `${tag} `)}</p>
                    </div>
                    <div class="nes-container is-rounded is-dark">
                        <p>Price: {price}</p>
                    </div>
                    <section class="icon-list">
                        <i class="nes-icon twitter is-large"></i>
                        <i class="nes-icon is-large like"></i>
                        <i class="nes-icon instagram is-large"></i>
                    </section>
                </section>
            </section>
        </section>
        <section class="nes-container is-dark">
        <div class="nes-container is-dark with-title">
            <p class="title">Bitmap</p>
            <p><img src={photo} alt={name}></img></p>
        </div>
        </section>
        
        <div className="options">
            <Link to={`/change/${_id}`}>
                <button class="nes-btn is-warning">Modify this Ad</button>
            </Link>
            <Link to={`/ads`}>
                <button class="nes-btn is-error">Back to Ads</button>
            </Link>
            
        </div>
        
    </div>
)

export default PrintDetail;