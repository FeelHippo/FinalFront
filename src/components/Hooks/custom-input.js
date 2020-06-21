import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { updateField } from '../../store/actions/index';

export const myCustomSelector = createSelector(
    state => state.home,
    (_, name) => name,
    (home, name) => home[name]
)

const namedInput = () => myCustomSelector;
    

export const CustomInput = ({ label, type, name, container }) => {

    const memoInput = useMemo(
        namedInput,
        []
    )
       
    const value = useSelector(state => memoInput(state, name))
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