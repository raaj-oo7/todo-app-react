import React from 'react';

const FormInput = ({ label, type, name, value, onChange, errorMessage }) => {
    return (
        <div className="form-group">
            <label htmlFor={`form${name}`} className='label-message'>{label}</label>
            {type === 'textarea' ? (
                <textarea
                    className="form-control"
                    rows="5"
                    name={name}
                    value={value}
                    onChange={onChange}
                ></textarea>
            ) : (
                <input
                    type={type}
                    className="form-control"
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            )}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};

export default FormInput;
