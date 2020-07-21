import React from 'react';
import { Link } from 'react-router-dom';
import Chat from '../../containers/Chat';
import { Helmet } from 'react-helmet';
import { TwitterShareButton } from 'react-twitter-embed';
import { FacebookProvider, ShareButton } from 'react-facebook';
import './detail.scss';

const PrintDetail = ({
    t,
    _id,
    ad,
    authenticated,
    markFavorite,
    favorite
}) => (
    <div className="detailContainer">
        <Helmet>
            <title>{`${ad.name} ${ad.tag1} ${ad.tag2}`}</title>
            <meta name="description" content={`${ad.description}`} />
        </Helmet>
        <div className="detailText">
            <div className="detailName">
                <span>{t('detail.name')}</span>
                <p>{ad.name}</p>
            </div>
            <div className="detailDesc">
                <span>{t('detail.description')}</span>
                <p>{ad.description}</p>
            </div>
        </div>
        <div className="detailInfo">
            <div>
                <p>#{ad.tag1}</p>
            </div>
            <div>
                <p>#{ad.tag2}</p>
            </div>
            
            <div>
                <p>{t('detail.price')}: {ad.price}</p>
            </div>
        </div>
        <div className="detailPic">
            <img src={'http://localhost:5000/api/photo/' + ad.photo} alt={ad.name}></img>
        </div>
        
        <section className="options">
            <div className="navDetail">
                <Link to={`/change/${_id}`}>
                    <button>{t('detail.modify')}</button>
                </Link>
                <Link to={`/`}>
                    <button>{t('detail.back')}</button>
                </Link>
            </div>
            <label>
                Favorite
            </label>
            <div onClick={() => markFavorite()} className="favoriteDetail">
                {
                    favorite ? (
                        <img src={require('../../icons/star_full.svg')} alt="favorite" />
                    ) : (
                        <img src={require('../../icons/star_empty.svg')} alt="favorite" />
                    )
                }
                
            </div>
            <div className="detailSocial">
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
            </div>
            
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