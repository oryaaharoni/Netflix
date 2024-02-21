import React, { useState } from 'react'
import './input.css'

const Input = ({ onChange, type, value, name, placeholder, isRequired, error }) => {

    const [isInputFocused, setIsInputFocused] = useState(false);

    const handleFocus = () => {
        setIsInputFocused(true);
    };

    const handleBlur = () => {
        setIsInputFocused(false);
    };

    const handleChange = (e) => {
        setIsInputFocused(false);
        onChange(e);
    };

    return (
        <>
            <input type={type}
                className={`inputField ${error ? 'errorBorder' : ''}`}
                value={value}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder={placeholder}
                name={name}
                required={isRequired}
            />
            {error && !isInputFocused && (
                <p className='error'>
                    <i className="fa-solid fa-circle-xmark iconX"></i> {error}
                </p>
            )}
        </>
    )
}

export default Input