import React from 'react';
import { useForm } from '../context';
import { pages } from '../config/appConfig';
import { FormTemplate } from '../pages';
import './styles.css'

export function FormContainer() {
    const { state: { step, done }, dispatch } = useForm();
    const id = Object.values(pages).find(p => p.step === step).id;

    return (
        <FormTemplate id={id} step={step} done={done} dispatch={dispatch} />
    )
}
