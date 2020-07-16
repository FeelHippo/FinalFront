import React from 'react';
import { Link } from 'react-router-dom';
import Chat from '../../containers/Chat';
import { Helmet } from 'react-helmet';
import { TwitterShareButton } from 'react-twitter-embed';
import { FacebookProvider, ShareButton } from 'react-facebook';

const PrintDetail = ({
    t,
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
        <section>
            <section class="message-list">
                <section>
                    <div>
                        <span>{t('detail.name')}</span>
                        <p>{ad.name}</p>
                    </div>
                    <div>
                        <span>{t('detail.description')}</span>
                        <p>{ad.description}</p>
                    </div>
                </section>
            </section>
        </section>
        <section>
            <section>
                <section class="message -left">
                    <div>
                        <p>{ad.tag1}</p>
                    </div>
                    <div>
                        <p>{ad.tag2}</p>
                    </div>
                    
                    <div>
                        <p>Price: {ad.price}</p>
                    </div>
                </section>
            </section>
        </section>
        <section>
        <div>
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
                <button>{t('detail.modify')}</button>
            </Link>
            <Link to={`/`}>
                <button>{t('detail.back')}</button>
            </Link>
            <TwitterShareButton
                url={window.location.href}
                options={{ text: `${ad.name}-${ad.description}`, via: 'FeelHippo' }}
            />
            {/* once live, get appId */}
            <FacebookProvider appId="FeelHippo"> 
                <ShareButton href="http://www.facebook.com">
                {t('detail.facebook')}
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