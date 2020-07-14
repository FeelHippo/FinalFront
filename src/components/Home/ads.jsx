import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Navbar from '../Navbar/navbar';
import { Card } from '../Hooks/custom-card';
import List from '../List/list';

const searchSchema = Yup.object().shape({
    name: Yup.string(),
    tag1: Yup.string(),
    tag2: Yup.string(),
    price_low: Yup.number(),
    price_high: Yup.number().positive(),
    type: Yup.bool().required()
})

const userSchema = Yup.object().shape({
    name: Yup.string().required(),
})

const Home = ({
    valid_tags,
    ads,
    searchAds,
    searchUser,
    changeOrder,
    oldFirst
}) => (
        
    <div className='ads-dashboard'>
        <div className="container">
            <Navbar />
            <Formik
                initialValues={{
                    name: '',
                }}
                validationSchema={ userSchema }
                enableReinitialize={ true }
                onSubmit={
                    values => {
                        searchUser(values)
                    }
                }    
            >
                {
                    ({ errors, touched }) => (
                        <Form>
                            <Field name="name" />
                            {errors.name && touched.name ? (
                                <div>{errors.name}</div>
                            ) : null}
                            <button type="submit">Search User Ads</button>
                        </Form>
                    )
                }
            </Formik>
            <Formik
                initialValues={{
                    name: '',
                    tag1: '',
                    tag2: '',
                    price_low: 0,
                    price_high: 9999,
                    type: true,
                }}
                validationSchema={ searchSchema }
                enableReinitialize={ true }
                onSubmit={
                    values => {
                        searchAds(values);
                    }
                }
            >
                {
                    ({ errors, touched }) => (
                        <Form>
                            <Field name="name" />
                            {errors.name && touched.name ? (
                                <div>{errors.name}</div>
                            ) : null}  
                            <Field name="price_low" type="number" />
                            {errors.price_low && touched.price_low ? (
                                <div>{errors.price_low}</div>
                            ) : null}
                            <Field name="price_high" type="number" />
                            {errors.price_high && touched.price_high ? (
                                <div>{errors.price_high}</div>
                            ) : null}
                            <Field 
                                name="type"
                                render={
                                    ({ field }) => (
                                        <>
                                            <div>
                                                <label htmlFor="true">Sell</label>
                                                <input 
                                                    {...field}
                                                    value="true"
                                                    checked={field.value === "true"}
                                                    name="type"
                                                    type="radio"
                                                />   
                                            </div>

                                            <div>
                                                <label htmlFor="false">Buy</label>
                                                <input 
                                                    {...field}
                                                    value="false"
                                                    checked={field.value === "false"}
                                                    name="type"
                                                    type="radio"
                                                />   
                                            </div>
                                        </>
                                    )
                                }

                            />
                            {errors.type && touched.type ? (
                                <div>{errors.type}</div>
                            ) : null}
                            <Field name="tag1" as="select" placeholder="Select a tag" id="tag1">
                                <option value="">Select First Tag</option>
                                {valid_tags && valid_tags.length ? (
                                    valid_tags.map(tag => {
                                        return ( <option value={tag}>{tag}</option> )
                                    })
                                ) : (
                                    ''
                                )
                                }
                            </Field>
                            {errors.tag1 && touched.tag1 ? (
                                <div>{errors.tag1}</div>
                            ) : null}
                            <Field name="tag2" as="select" placeholder="Select another tag" id="tag2">
                                <option value="">Select Second Tag</option>
                                {valid_tags && valid_tags.length ? (
                                    valid_tags.map(tag => {
                                        return ( <option value={tag}>{tag}</option> )
                                    })
                                ) : (
                                    ''
                                )
                                }
                            </Field>
                            {errors.tag2 && touched.tag2 ? (
                                <div>{errors.tag2}</div>
                            ) : null}
                            <button type="submit">Search</button>
                        </Form>
                    )
                }
            </Formik>
            {/* <form onSubmit={e => {
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
            </form> */}
            <Link to='/createAd'>
                <button type="button" class="warning">Create Ad</button>
            </Link>
            <div className="listContainer">
                <select value={oldFirst} name="oldFirst" onChange={evt => changeOrder(evt)}>
                    <option value="false">Latest</option>
                    <option value="true">Oldest</option>
                </select>
                {
                    ads.length ? (
                        <List
                            items={ads}
                            oldFirst={oldFirst}
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