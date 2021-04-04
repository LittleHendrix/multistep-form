import React from 'react';
import { actions } from '../config/appConfig';
import { FormField } from '../utils';
import { Form } from '../components';

export function FormTemplate({id, step, done, dispatch}) {
    return (
        <Form id={id}>
            {({userFormFields, inputValues, errors, onChangeHandler}) => {
                return (
                <>
                    {done && (
                        <>
                            {console.table(inputValues)}
                            <article>
                                <h1 className="success">Please verify your email address. You should have received an email from us already.</h1>
                            </article>
                        </>
                    )}
                    {userFormFields.map((fieldProps, i) => <FormField key={i} {...fieldProps} value={inputValues[fieldProps.id]} error={errors.get(fieldProps.id)} onChangeHandler={onChangeHandler} />)}
                    <div className="form-row submit-row">
                        {step > 0 && <input type="button" id="prev" value="Go back" onClick={() => dispatch({ type: actions.PREV, payload: step })} />}
                        {!done && <input type="submit" id="submit" value="submit" />}
                    </div>
                </>
            )}}
        </Form>
    )
}