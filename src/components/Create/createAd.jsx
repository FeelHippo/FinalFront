import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { CustomRadio } from '../Hooks/custom-radio';
import { CustomSelect } from '../Hooks/custom-select';

let CreateNewAd = ({
    handleSubmit,
    valid_tags
}) => {
    return (
        <div className='ads-create' class="nes-container with-title is-centered">
            <p class="title nes-text is-warning">Create Your Ad</p>
            <form onSubmit={ handleSubmit }>
                <h1 class="nes-text is-primary">Create Stuff</h1>

                <div class="nes-field">
                    <label htmlFor="name">Name It!</label>
                    <Field name="name" component="input" type="text" class="nes-input" />
                </div>

                <div class="nes-field">
                    <label htmlFor="price">Price It!</label>
                    <Field name="price" component="input" type="number" class="nes-input" />
                </div>
                
                <label>Type of Transaction</label>
                <div>
                    <Field name="type" component={CustomRadio} />
                </div>

                <div class="nes-field">
                    <label htmlFor="description">Describe It!</label>
                    <Field name="description" component="input" type="text" class="nes-input" />
                </div>

                <div>
                    <label>Tag It Once!</label>
                    <Field  name="tag1" 
                            valid_tags={valid_tags} 
                            component={CustomSelect} />
                </div>

                <div>
                    <label>Tag It Twice!</label>
                    <Field  name="tag2" 
                            valid_tags={valid_tags} 
                            component={CustomSelect} />
                </div>

                <div class="nes-field">
                    <label htmlFor="photo">Pick a Pic!</label>
                    <Field name="photo" component="input" type="text" class="nes-input" />
                </div>

                <button type='submit' class="nes-btn is-primary">Submit It!</button>
            </form>
            <Link to='/ads'>
                <button class="nes-btn is-warning">Back</button>
            </Link>
        </div>
    )
}

CreateNewAd = reduxForm({
    form: 'create ad'
})(CreateNewAd);

export default CreateNewAd;