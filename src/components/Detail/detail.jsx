import React from 'react';
import { Link } from 'react-router-dom';
import {Helmet} from 'react-helmet'

const PrintDetail = ({
    _id,
    tag1,
    tag2,
    name,
    price,
    description,
    photo
}) => (
    <div>
        <Helmet>
            <title>{`${name}-${tag1}-${tag2}`}</title>
            <meta name="description" content={`${description}`} />
        </Helmet>
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
                        <p>{tag1}</p>
                    </div>
                    <div class="nes-container is-rounded is-dark">
                        <p>{tag2}</p>
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
            <Link to={`/`}>
                <button class="nes-btn is-error">Back to Ads</button>
            </Link>
            
        </div>
        
    </div>
)

export default PrintDetail;