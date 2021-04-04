import React from 'react';
import { useForm } from '../context';
import { actions, formFields } from '../config/appConfig';
import { validate } from '../utils';

export function Form({children, id}) {
    const { state, dispatch } = useForm();
    const { errors, step, inputValues: ctxInputValues } = state;
    const [ inputValues, setInputValues ] = React.useState(ctxInputValues);
    const userFormFields = formFields[id];

    const dispatchErrors = (key, errMsg) => {
        dispatch({ type: actions.ERROR, payload: { key, value: errMsg }});
    }

    const handleSubmit = event => {
        event.preventDefault();
        const data = new FormData(event.target);

        // validate all form input entries 
        for (let [key, value] of data.entries()) {
            const validationSchema = userFormFields.find(f => f.id === key).validationSchema;
            if (validationSchema) validate(key, value, validationSchema, dispatchErrors);
        }
        // find if any errors exists for inputs in the current form
        const formErr = [...errors.entries()].filter(([key, errMsg]) => Object.keys(inputValues).includes(key) && errMsg !== '');

        if (formErr.length === 0) {
            dispatch({ type: actions.USER_FORM, payload: data });
            // progress to the next step
            setTimeout(() => {
                dispatch({ type: actions.NEXT, payload: step })
            }, 100);
        }
    }

    const onChangeHandler = event => {
        const key = event.target.id;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        
        setInputValues({ ...inputValues, [key]: value });

        const validationSchema = userFormFields.find(f => f.id === key).validationSchema;
        if (validationSchema) {
            const validateTimeoutId = setTimeout(() => {
                clearTimeout(validateTimeoutId);
                validate(key, value, validationSchema, dispatchErrors);
            }, 100);
        }
    }
    
    return (
        // bypass native HTML5 validation attributes (e.g. required, minlenght, pattern, .etc) and handle errors ourselves
        <form id={id} autoComplete="off" onSubmit={handleSubmit} noValidate>
            {children({ userFormFields, inputValues, errors, onChangeHandler})}
        </form>
    )
}