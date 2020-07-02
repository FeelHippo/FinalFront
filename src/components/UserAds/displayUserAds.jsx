import React from 'react';
import Navbar from '../Navbar/navbar';
import { Card } from '../Hooks/custom-card';
import List from '../List/list';

const UserAdsSection = ({
    ads,
    user,
    navigateHome
}) => (
    <div className='ads-dashboard' >
        <div className='container'>
            <Navbar />

            
            <h2>{user}</h2>
            <h3>Active Ads: {ads.length}</h3>
            

            <button type="button" class='success' onClick={() => navigateHome()}>Home</button>

            <div className="listContainer">
                {
                    ads.length ? (
                        <List
                            items={ads}
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