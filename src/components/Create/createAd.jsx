import React, {useCallback} from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import {useDropzone} from 'react-dropzone';

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

let CreateNewAd = ({
    valid_tags,
    handleSubmit,
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
                    <label><Field name="type" component="input" type="radio" value="true"/>Sale</label>
                    <label><Field name="type" component="input" type="radio" value="false"/> Purchase</label>
                </div>

                <div class="nes-field">
                    <label htmlFor="description">Describe It!</label>
                    <Field name="description" component="input" type="text" class="nes-input" />
                </div>

                <div>
                    <Field name="tag1" component="select">
                        <option>Select First Tag</option>
                        {valid_tags && valid_tags.length ? (
                            valid_tags.map(tag => {
                                return ( <option value={tag}>{tag}</option> )
                            })
                        ) : (
                            ''
                        )
                        }
                    </Field>
                </div>

                <div>
                    <Field name="tag2" component="select">
                        <option>Select Second Tag</option>
                        {valid_tags && valid_tags.length ? (
                            valid_tags.map(tag => {
                                return ( <option value={tag}>{tag}</option> )
                            })
                        ) : (
                            ''
                        )
                        }
                    </Field>
                </div>

                <div>
                    <label htmlFor="photo">Pick a Pic!</label>
                    <Field name="photo" component={MyDropzone} />
                </div>

                <button type='submit' class="nes-btn is-primary">Submit It!</button>
            </form>
            <Link to='/'>
                <button class="nes-btn is-warning">Back</button>
            </Link>
        </div>
    )
}

CreateNewAd = reduxForm({
    form: 'create ad'
})(CreateNewAd);

export default CreateNewAd;