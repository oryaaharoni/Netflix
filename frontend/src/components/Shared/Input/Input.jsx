import React from 'react'
import './input.css'

const Input = ({ onChange, type, value, name, placeholder, isRequired, error }) => {
    return (
        <>
            <input type={type} className='inputField' value={value} onChange={onChange} placeholder={placeholder} name={name} required={isRequired}/>
            {error && <p className='error'>{error}</p>}
        </>
    )
}

export default Input