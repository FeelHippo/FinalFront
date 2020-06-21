import React from 'react';

const selectGroupGenerator = ({ valid_tags, input: { onChange, value }, placeholderTag }) => {
    
    return (
        <div class="nes-select">
            <select required 
                    id="default_select"
                    onChange={onChange}
                    value={value}
            >
            <option value="" disabled selected>{placeholderTag}</option>
            {valid_tags.map((tag, i) => {
                return (
                    <option value={tag} key={i}>{tag}</option>
                )
            })}
            </select>
        </div>
        
    )
}

export default selectGroupGenerator;