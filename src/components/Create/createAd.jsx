import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Thumb from '../Thumb/thumbnail';

const adSchema = Yup.object().shape({
    name: Yup.string(),
    price: Yup.number().positive(),
    description: Yup.string(),
    tag1: Yup.string(),
    tag2: Yup.string(),
})

const CreateNewAd = ({
    valid_tags,
    handleSubmit,
}) => (
    <div className='ads-create'>
        <p>Create Your Ad</p>
        <Formik
            initialValues={{
                name: '',
                price: '',
                type: true,
                description: '',
                tag1: '',
                tag2: '',
                photo: undefined,
            }}
            validationSchema={ adSchema }
            onSubmit={
                values => {
                    handleSubmit(values);
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
                                ''
                            )
                        }
                        <button type="submit">Submit</button>
                    </Form>
                )
            }
        </Formik>
        <Link to='/'>
            <button >Back</button>
        </Link>
    </div>
)

export default CreateNewAd;