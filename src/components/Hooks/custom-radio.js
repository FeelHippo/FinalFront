import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from '../../store/actions/index';


export const CustomRadio = ({ label, name }) => {

    const sale = useSelector(state => state.home.sale)
    const dispatch = useDispatch();
    
    return (
        <label class="nes-text is-primary">
            {label}
            <div className="customRadios">
                <label>
                    <input  type="radio" 
                            class="nes-radio" 
                            name={name} 
                            value={true} 
                            onChange={evt => {
                                evt.preventDefault();
                                dispatch(updateField(evt));
                                }}
                            checked={sale === true} />
                    <span>Selling</span>
                </label>

                <label>
                    <input  type="radio" 
                            class="nes-radio" 
                            name={name} 
                            value={false}
                            onChange={evt => {
                                evt.preventDefault();
                                dispatch(updateField(evt));
                                }}
                            checked={sale === false} />
                    <span>Buying</span>
                </label>
            </div>
        </label>
    )
}