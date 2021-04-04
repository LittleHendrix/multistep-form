import React from 'react';

/**
 * 
 * @param {string} key 
 * @param {string} value 
 * @param {object} schema - schema to validate against value
 * @param {function} cb - (key, errMsg) => {}
 * @returns boolean - returns true if input is valid
 */
export const validate = (key, value, schema, cb) => {
    if (!schema) return true;
    let noErrors = false;
    for (let [rgx, errMsg] of schema) {
        noErrors = value.match(rgx) !== null;
        if (cb) {
            noErrors ? cb(key, '') : cb(key, errMsg);
        }
        if (!noErrors) {
            // break as soon as one condition fails to prevent overwriting error message
            break;
        }
    }
    return noErrors;
}

export const FormField = ({ id, label, type, required, error, value, onChangeHandler }) => {
    const isCheckbox = type === 'checkbox';
    const checkboxProps = isCheckbox ? { checked: !!value } : {};
    return (
        <div className="form-row">
            <div className={isCheckbox ? 'field-container checkbox' : 'field-container'} data-testid={`${id}-input`}>
                <div className="label-container">
                    <label htmlFor={id}>{label}</label>
                    {required && <sup>*</sup>}
                </div>
                <input type={type} id={id} name={id} required={required} value={value} onChange={onChangeHandler} className={error ? 'error' : ''} {...checkboxProps} />
            </div>
            {error && <span role="alert" className="error" data-testid={`${id}-error`}>{error}</span>}
        </div>
    )
}