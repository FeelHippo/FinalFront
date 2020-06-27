import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from '../../store/actions/index';


export const CustomRadio = ({ label, name }) => {

    const sale = useSelector(state => state.user_search[name])
    const dispatch = useDispatch();
    
    return (
        <section>
            {label}
            <div className="customRadios">
                <label>
                    <input  type="radio" 
                            name={name} 
                            value={true} 
                            onChange={evt => {
                                evt.preventDefault();
                                dispatch(updateField(evt));
                                }}
                            checked={sale === true} />
                    <span class="checkable" >Selling</span>
                </label>

                <label>
                    <input  type="radio" 
                            name={name} 
                            value={false}
                            onChange={evt => {
                                evt.preventDefault();
                                dispatch(updateField(evt));
                                }}
                            checked={sale === false} />
                    <span class="checkable" >Buying</span>
                </label>
            </div>
        </section>
    )
}