import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import { CustomInput } from '../Hooks/custom-input';
import { CustomSelect } from '../Hooks/custom-select';
import { CustomRadio } from '../Hooks/custom-radio';
import { Card } from '../Hooks/custom-card';
import List from '../List/list';

const Home = ({
    ads,
    searchAds,
    searchUser,
}) => (
        
    <div className='ads-dashboard'>
        <div className="container">
            <Navbar />
            <form onSubmit={e => {
                e.preventDefault();
                searchUser()}
            }>
                <CustomInput label='Search a User' type='text' name='user' container='Home' />
                <button type='submit'class="success">Search</button>
            </form>
            <form onSubmit={e => {
                e.preventDefault();
                searchAds()}
            }>
                <CustomInput label='Article Name' type='text' name='name' container='Home' />

                <CustomInput label='Price From' type='number' name='price_low' container='Home' />
                <CustomInput label='Price To' type='number' name='price_high' container='Home' />

                <CustomSelect label='Select First Tag' name='tag1' />
                <CustomSelect label='Select Second Tag' name='tag2' />
                <CustomRadio label='Are You Buying or Selling?' name='type' />

                <button type='submit'class="success">Search</button>
            </form>
            <Link to='/createAd'>
                <button type="button" class="warning">Create Ad</button>
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

export default Home;