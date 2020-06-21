import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from '../../store/actions/index';


export const CustomSelect = ({ label, name }) => {

    const results = useSelector(state => state.home.valid_tags);
    const dispatch = useDispatch();
    
    return (
        <label class="nes-text is-primary">
            {label}
            <div class="nes-select">
                <select id="0" name={name} onChange={evt => {
                evt.preventDefault();
                dispatch(updateField(evt));
                }} 
                >
                    {
                        results.map((tag, i) => {
                            return (
                                <option value={tag} key={i}>{tag}</option>
                            )
                        })
                    }
                </select>
            </div>
        </label>
    )
}