import React, { useContext } from 'react';
import { reactReduxContext, ReactReduxContext } from 'react-redux';

const SelectGroupGenerator = ({ valid_tags, input: { onChange, value }, placeholderTag }) => {
    
    const { store } = useContext(ReactReduxContext);
    const { getState } = store;
    const state = getState();

    return (
        <div class="nes-select">
            <select required 
                    id="default_select"
                    onChange={onChange}
                    value={value}
            >
            <option value="" disabled selected>{placeholderTag}</option>
            {state.valid_tags.map((tag, i) => {
                return (
                    <option value={tag} key={i}>{tag}</option>
                )
            })}
            </select>
        </div>
        
    )
}

export default SelectGroupGenerator;