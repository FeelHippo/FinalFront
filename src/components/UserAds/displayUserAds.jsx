import React from 'react';
import Navbar from '../Navbar/navbar';
import { Card } from '../Hooks/custom-card';
import List from '../List/list';
import './userAd.scss';

const UserAdsSection = ({
    t,
    ads,
    user,
    navigateHome
}) => (
    <div className='user-ads-dashboard' >
        <Navbar />
        <div className='user-container'>
            
            <h2>User: {user}</h2>
            <h3>{t('user.title')}{ads.items ? ads.items.length : ''}</h3>
            

            <button type="button" class='success' onClick={() => navigateHome()}>{t('user.home')}</button>

            <div className="listContainer">
                {
                    ads.items ? (
                        <List
                            items={ads.items}
                            renderItem={
                                ad => (
                                    <Card {...ad} />
                            )}
                        />
                    ) : (
                        <div></div>
                    )
                }
            </div>
        </div>
    </div>
)

export default UserAdsSection;