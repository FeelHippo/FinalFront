import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from '../../store/actions/index';    

export const CustomInput = ({ label, type, name }) => {
       
    const value = useSelector(state => state.user_search[name])
    const dispatch = useDispatch();
    
    return (
        <label class="nes-text is-primary">
            {label}
            <input type={type} class="nes-input" name={name} value={value} onChange={ evt => {
                evt.preventDefault();
                dispatch(updateField(evt));
            } } 
            />
        </label>
    )
}