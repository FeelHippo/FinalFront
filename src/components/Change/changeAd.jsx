import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Thumb from '../Thumb/thumbnail';

const adSchema = Yup.object().shape({
    name: Yup.string(),
    price: Yup.number().positive(),
    description: Yup.string(),
    tag1: Yup.string(),
    tag2: Yup.string(),
})

let ChangeExistingAd = ({
    handleSubmit,
    valid_tags,
    onDelete,
    toggle,
    ad,
}) => (
    <div className='ads-change'>
        <p>Modify Ads</p>
        <Formik 
            initialValues={{
                name: ad.name,
                price: ad.price,
                type: ad.type,
                description: ad.description,
                tag1: ad.tag1,
                tag2: ad.tag2,
                photo: undefined,
            }}
            validationSchema={ adSchema }
            enableReinitialize={ true }
            onSubmit={
                values => {
                    handleSubmit(values)
                }
            }
        >
            {
                ({ values, errors, touched, setFieldValue }) => (
                    <Form>
                        <Field name="name" />
                        {errors.name && touched.name ? (
                            <div>{errors.name}</div>
                        ) : null}
                        <Field name="price" type="number" />
                        {errors.price && touched.price ? (
                            <div>{errors.price}</div>
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
                        <Field name="description" />
                        {errors.description && touched.description ? (
                            <div>{errors.description}</div>
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
                        <input name="photo" type="file" onChange={
                            (event) => {
                                setFieldValue('photo', event.currentTarget.files[0])
                            }
                        }
                        />
                        {errors.photo && touched.photo ? (
                            <div>{errors.photo}</div>
                        ) : null}
                        {
                            values.photo ? (
                                <Thumb key="preview" file={values.photo} />
                            ) : (
                                <img src={'http://localhost:5000/api/photo/' + ad.photo} alt={ad.name}></img>
                            )
                        }
                        <button type="submit">Submit</button>
                    </Form>
                )
            }
        </Formik>
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


export default ChangeExistingAd;