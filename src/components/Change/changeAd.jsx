import React, {useCallback} from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import {useDropzone} from 'react-dropzone';
import radioGroupGenerator from '../Radio/radioGroupGenerator';
import selectGroupGenerator from '../Select/selectGroupGenerator';

function MyDropzone() {
    const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
   
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
    )
}


let ChangeExistingAd = ({
    handleSubmit,
    onDelete,
    toggle,
    ad,
}) => {
    return(
        <div className='ads-create' class="nes-container with-title is-centered">
            <p class="title nes-text is-warning">Modify Ads</p>
            <form onSubmit={e => {
                e.preventDefault();
                handleSubmit();
            } 
            }>
                <h1 class="nes-text is-primary">Change Stuff</h1>

                <div class="nes-field">
                    <label htmlFor="name">Name It!</label>
                    <Field name="name" component="input" type="text" class="nes-input" placeholder={ad.name} />
                </div>

                <div class="nes-field">
                    <label htmlFor="price">Price It!</label>
                    <Field name="price" component="input" type="number" class="nes-input" placeholder={ad.price} />
                </div>
                
                <label>Type of Transaction</label>
                <div>
                    <Field name="type" component={radioGroupGenerator} />
                </div>

                <div class="nes-field">
                    <label htmlFor="description">Describe It!</label>
                    <Field name="description" component="input" type="text" class="nes-input" placeholder={ad.description} />
                </div>

                {
                    ad.tag1 ? (
                        <div>
                            <label>Tag It Once!</label>
                            <Field  name="tag1" 
                                    component={selectGroupGenerator}
                                    placeholderTag={ad.tag1} />
                        </div>
                    ) : (
                        ''
                    )
                }

                {
                    ad.tag2 ? (
                        <div>
                            <label>Tag It Twice!</label>
                            <Field  name="tag2" 
                                    component={selectGroupGenerator}
                                    placeholderTag={ad.tag2} />
                        </div>
                    ) : (
                        ''
                    )
                }

                <div>
                    <label htmlFor="photo">Pick a Pic!</label>
                    <Field name="photo" component={MyDropzone} />
                </div>

                <button type='submit' class="nes-btn is-primary">Submit It!</button>
            </form>
            <div>
                
                <button type='button' class="nes-btn is-primary" onClick={ onDelete }>Delete It!</button>

            <button type="button" name="reserved" onClick={ e => toggle(e) }>{
                ad.reserved ? "Cancel Reservation" : "Mark as Reserved"
            }</button>

            <button type="button" name="sold" onClick={ e => toggle(e) }>{
                ad.sold ? "Currently Available" : "Mark as Sold"
            }</button>
            
            </div>
            <Link to='/'>
                <button class="nes-btn is-warning">Back</button>
            </Link>
        </div>
    )
}

ChangeExistingAd = reduxForm({
    form: 'change ad'
})(ChangeExistingAd);

export default ChangeExistingAd;