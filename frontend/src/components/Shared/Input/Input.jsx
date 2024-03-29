import './input.css'
import {PropTypes, useState} from '../../../imports'
import { forwardRef } from 'react';

const Input = forwardRef(({ onChange, type, value, name, placeholder, isRequired, error }, ref) => {

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
                ref={ref}
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
});

Input.propTypes ={onChange: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool,
    error: PropTypes.string}

export default Input