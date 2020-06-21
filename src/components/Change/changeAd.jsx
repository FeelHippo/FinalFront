import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import radioGroupGenerator from '../Radio/radioGroupGenerator';
import selectGroupGenerator from '../Select/selectGroupGenerator';

let ChangeExistingAd = ({
    handleSubmit,
    valid_tags,
    name,
    price,
    description,
    photo,
    tags
}) => {
    return(
        <div className='ads-create' class="nes-container with-title is-centered">
            <p class="title nes-text is-warning">Modify Ads</p>
            <form onSubmit={ handleSubmit }>
                <h1 class="nes-text is-primary">Change Stuff</h1>

                <div class="nes-field">
                    <label htmlFor="name">Name It!</label>
                    <Field name="name" component="input" type="text" class="nes-input" placeholder={name} />
                </div>

                <div class="nes-field">
                    <label htmlFor="price">Price It!</label>
                    <Field name="price" component="input" type="number" class="nes-input" placeholder={price} />
                </div>
                
                <label>Type of Transaction</label>
                <div>
                    <Field name="type" component={radioGroupGenerator} />
                </div>

                <div class="nes-field">
                    <label htmlFor="description">Describe It!</label>
                    <Field name="description" component="input" type="text" class="nes-input" placeholder={description} />
                </div>

                <div>
                    <label>Tag It Once!</label>
                    <Field  name="tag1" 
                            valid_tags={valid_tags} 
                            component={selectGroupGenerator}
                            placeholderTag={tags[0]} />
                </div>

                <div>
                    <label>Tag It Twice!</label>
                    <Field  name="tag2" 
                            valid_tags={valid_tags} 
                            component={selectGroupGenerator}
                            placeholderTag={tags[1]} />
                </div>

                <div class="nes-field">
                    <label htmlFor="photo">Pick a Pic!</label>
                    <Field name="photo" component="input" type="text" class="nes-input" placeholder={photo} />
                </div>

                <button type='submit' class="nes-btn is-primary">Submit It!</button>
            </form>
            <Link to='/ads'>
                <button class="nes-btn is-warning">Back</button>
            </Link>
        </div>
    )
}

ChangeExistingAd = reduxForm({
    form: 'change ad'
})(ChangeExistingAd);

export default ChangeExistingAd;