import React from 'react';
import { useForm } from '../context';
import { pages } from '../config/appConfig';

export function FormHeader() {
    const { state: { step: ctxStep } } = useForm();
    return (
        <div className="form-header">
            {Object.entries(pages).map(([key, {label, step }]) => <span key={key} className={step === ctxStep ? 'active' : ''}>{label}</span>)}
        </div>
    )
}