import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Thumb from '../Thumb/thumbnail';
import './changeAd.scss';

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
    t
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
                photo: ad.photo,
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
                    <Form className="modifyForm">
                        <label>{t('change.name')}</label>
                        <Field name="name" placeholder={t('change.name')}/>
                        {errors.name && touched.name ? (
                            <div>{errors.name}</div>
                        ) : null}
                        <label>{t('change.price')}</label>
                        <Field name="price" type="number" />
                        {errors.price && touched.price ? (
                            <div>{errors.price}</div>
                        ) : null}
                        <label>
                            {t('home.sell')}
                            <Field type="radio" name="type" value="true" />
                            {
                                values.type === 'true' || values.type === true ? (
                                    <img className="tick" src={require('../../icons/tick.svg')} alt="checked" />
                                ) : (
                                    ''
                                )
                            }
                        </label>
                        <label>
                            {t('home.buy')}
                            <Field type="radio" name="type" value="false" />
                            {
                                values.type === 'false' || values.type === false ? (
                                    <img className="tick" src={require('../../icons/tick.svg')} alt="checked" />
                                ) : (
                                    ''
                                )
                            }
                        </label>
                        {errors.type && touched.type ? (
                            <div>{errors.type}</div>
                        ) : null}
                        <label>{t('change.description')}</label>
                        <Field name="description" placeholder={t('change.description')}/>
                        {errors.description && touched.description ? (
                            <div>{errors.description}</div>
                        ) : null}
                        <Field name="tag1" as="select" placeholder="Select a tag" id="tag1">
                            <option value="">{t('change.first_tag')}</option>
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
                            <option value="">{t('change.second_tag')}</option>
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
                            values.photo !== ad.photo ? (
                                <Thumb key="preview" file={values.photo} />
                            ) : (
                                <img src={'http://localhost:5000/api/photo/' + ad.photo} alt={ad.name}></img>
                            )
                        }
                        <button type="submit" class='success'>{t('change.submit')}</button>
                    </Form>
                )
            }
        </Formik>
        <div className="buttonsChange">

            <button type="button" name="reserved" onClick={ e => toggle(e) } class='warning'>{
                ad.reserved ? t('change.cancel_res') : t('change.mark_res')
            }</button>

            <button type="button" name="sold" onClick={ e => toggle(e) } class='warning'>{
                ad.sold ? t('change.available') : t('change.sold')
            }</button>

            <button type='button' onClick={ onDelete } class='error'>{t('change.delete')}</button>

            <Link to='/'>
                <button>{t('change.back')}</button>
            </Link>
        
        </div>
    </div>
)


export default ChangeExistingAd;