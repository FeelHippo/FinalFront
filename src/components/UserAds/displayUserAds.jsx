import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import { Card } from '../Hooks/custom-card';
import List from '../List/list';

const UserAdsSection = ({
    ads,
    user
}) => (
    <div className='ads-dashboard' >
        <div className='container'>
            <Navbar />

            
            <h2>{user}</h2>
            <h3>Active Ads: {ads.length}</h3>
            

            <Link to='/'>
                <button type="button" class='success'>Home</button>
            </Link>

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