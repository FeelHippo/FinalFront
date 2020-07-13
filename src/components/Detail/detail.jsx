import React from 'react';
import { Link } from 'react-router-dom';
import Chat from '../../containers/Chat';
import { Helmet } from 'react-helmet';
import { TwitterShareButton } from 'react-twitter-embed';
import { FacebookProvider, ShareButton } from 'react-facebook';

const PrintDetail = ({
    _id,
    ad,
    authenticated,
    markFavorite,
    favorite
}) => (
    <div>
        <Helmet>
            <title>{`${ad.name}-${ad.tag1}-${ad.tag2}`}</title>
            <meta name="description" content={`${ad.description}`} />
        </Helmet>
        <section class="nes-container is-dark">
            <section class="message-list">
                <section>
                    <div class="nes-container is-rounded is-dark">
                        <p>Item: {ad.name}</p>
                    </div>
                    <div class="nes-container is-rounded is-dark">
                        <p>Description: {ad.description}</p>
                    </div>
                </section>
            </section>
        </section>
        <section>
            <section class="nes-container is-dark">
                <section class="message -left">
                    <div class="nes-container is-rounded is-dark">
                        <p>{ad.tag1}</p>
                    </div>
                    <div class="nes-container is-rounded is-dark">
                        <p>{ad.tag2}</p>
                    </div>
                    
                    <div class="nes-container is-rounded is-dark">
                        <p>Price: {ad.price}</p>
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
            <p><img src={'http://localhost:5000/api/photo/' + ad.photo} alt={ad.name}></img></p>
        </div>
        </section>
        
        <section className="options">
            <div onClick={() => markFavorite()}>
                {
                    favorite ? (
                        <img src={require('../../icons/star_full.svg')} alt="favorite" />
                    ) : (
                        <img src={require('../../icons/star_empty.svg')} alt="favorite" />
                    )
                }
                
            </div>
            <Link to={`/change/${_id}`}>
                <button class="nes-btn is-warning">Modify this Ad</button>
            </Link>
            <Link to={`/`}>
                <button class="nes-btn is-error">Back to Ads</button>
            </Link>
            <TwitterShareButton
                url={window.location.href}
                options={{ text: `${ad.name}-${ad.description}`, via: 'FeelHippo' }}
            />
            {/* once live, get appId */}
            <FacebookProvider appId="FeelHippo"> 
                <ShareButton href="http://www.facebook.com">
                Share
                </ShareButton>
            </FacebookProvider>
        </section>
        <section>
            {
                authenticated ? (
                    <Chat />
                ) : (
                    ''
                )
            }
        </section>
    </div>
)

export default PrintDetail;