import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { validate, FormField } from './formHelpers';
import { pages, formFields } from '../config/appConfig';

describe('formHelpers - validate', () => {

    const userFormInputs = formFields[pages.USER.id];
    const validateCb = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return if no validationSchema is available for input', () => {
        const roleField = userFormInputs.find(i => i.id === 'role');
        const { validationSchema} = roleField;
        expect(validate('role', '', validationSchema, validateCb)).toBe(true);
        expect(validateCb).not.toHaveBeenCalled();
    });

    test('should validate name input correctly', () => {
        const nameField = userFormInputs.find(i => i.id === 'name');
        const { id, validationSchema} = nameField;
        expect(validate('name', '', validationSchema, validateCb)).toBe(false);
        expect(validateCb).toHaveBeenCalledWith(id, validationSchema[0][1]);
        expect(validate('name', 'My name', validationSchema, validateCb)).toBe(true);
        expect(validateCb).toHaveBeenCalledWith(id, '');
    });

    test('should validate email input correctly', () => {
        const emailField = userFormInputs.find(i => i.id === 'email');
        const { id, validationSchema} = emailField;
        expect(validate('email', '', validationSchema, validateCb)).toBe(false);
        expect(validateCb).toHaveBeenCalledWith(id, validationSchema[0][1]);
        expect(validate('email', 'mail@invalid', validationSchema, validateCb)).toBe(false);
        expect(validateCb).toHaveBeenCalledWith(id, validationSchema[1][1]);
        expect(validate('email', 'mail@valid.com', validationSchema, validateCb)).toBe(true);
        expect(validateCb).toHaveBeenCalledWith(id, '');
    });

    test('should validate password input correctly - empty', () => {
        const passwordField = userFormInputs.find(i => i.id === 'password');
        const { id, validationSchema} = passwordField;
        expect(validate('password', '', validationSchema, validateCb)).toBe(false);
        expect(validateCb).toHaveBeenCalledWith(id, validationSchema[0][1]);
    });

    test('should validate password input correctly - less than 9 chars', () => {
        const passwordField = userFormInputs.find(i => i.id === 'password');
        const { id, validationSchema} = passwordField;
        expect(validate('password', 'tooshort', validationSchema, validateCb)).toBe(false);
        expect(validateCb).toHaveBeenCalledWith(id, validationSchema[1][1]);
    });

    test('should validate password input correctly - missing UPPERCASEW or lowercase char', () => {
        const passwordField = userFormInputs.find(i => i.id === 'password');
        const { id, validationSchema} = passwordField;
        expect(validate('password', 'nouppercase', validationSchema, validateCb)).toBe(false);
        expect(validateCb).toHaveBeenCalledWith(id, validationSchema[2][1]);
        expect(validate('password', 'NOLOWERCASE', validationSchema, validateCb)).toBe(false);
        expect(validateCb).toHaveBeenCalledWith(id, validationSchema[2][1]);
    });

    test('should validate password input correctly - missing number', () => {
        const passwordField = userFormInputs.find(i => i.id === 'password');
        const { id, validationSchema} = passwordField;
        expect(validate('password', 'ONLYletters', validationSchema, validateCb)).toBe(false);
        expect(validateCb).toHaveBeenCalledWith(id, validationSchema[3][1]);
    });
});

describe('formHelpers - FormField', () => {
    const ID = 'myInputId';
    let props = null;
    const onChange = jest.fn();
  
    const renderFormField = inputProps => {
      const utils = render(<FormField {...inputProps} />);
      const testInput = utils.getByTestId(`${inputProps.id}-input`);
      return { ...utils, testInput };
    };
  
    beforeEach(() => {
      props = {
        onChangeHandler: onChange,
        id: ID
      };
    });
  
    afterEach(() => {
      props = null;
      cleanup();
      jest.resetAllMocks();
    });

    test('should render name input field correctly', () => {
        const nameField = formFields[pages.USER.id].find(i => i.id === 'name');
        const { id, label, type, required } = nameField;

        props = { ...props, id, label, type, required };
        const { testInput, container } = renderFormField(props);
        const labelEl = container.querySelector('label');
        const inputEl = container.querySelector('input');
        expect(testInput).toBeInTheDocument();
        expect(labelEl).toBeInTheDocument();
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toBeRequired();
        expect(inputEl).toHaveAttribute('type', 'text');

        fireEvent.change(inputEl, { target: { value: 'My name' } });
        expect(onChange).toHaveBeenCalled();
    });

    test('should render role input field correctly', () => {
        const role = formFields[pages.USER.id].find(i => i.id === 'role');
        const { id, label, type, required } = role;

        props = { ...props, id, label, type, required };
        const { testInput, container } = renderFormField(props);
        const labelEl = container.querySelector('label');
        const inputEl = container.querySelector('input');
        expect(testInput).toBeInTheDocument();
        expect(labelEl).toBeInTheDocument();
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).not.toBeRequired();
        expect(inputEl).toHaveAttribute('type', 'text');

        fireEvent.change(inputEl, { target: { value: 'My role' } });
        expect(onChange).toHaveBeenCalled();
    });

    test('should render email input field correctly', () => {
        const email = formFields[pages.USER.id].find(i => i.id === 'email');
        const { id, label, type, required } = email;

        props = { ...props, id, label, type, required };
        const { testInput, container } = renderFormField(props);
        const labelEl = container.querySelector('label');
        const inputEl = container.querySelector('input');
        expect(testInput).toBeInTheDocument();
        expect(labelEl).toBeInTheDocument();
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toBeRequired();
        expect(inputEl).toHaveAttribute('type', 'email');

        fireEvent.change(inputEl, { target: { value: 'me@email.com' } });
        expect(onChange).toHaveBeenCalled();
    });

    test('should render password input field correctly', () => {
        const password = formFields[pages.USER.id].find(i => i.id === 'password');
        const { id, label, type, required } = password;

        props = { ...props, id, label, type, required };
        const { testInput, container } = renderFormField(props);
        const labelEl = container.querySelector('label');
        const inputEl = container.querySelector('input');
        expect(testInput).toBeInTheDocument();
        expect(labelEl).toBeInTheDocument();
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toBeRequired();
        expect(inputEl).toHaveAttribute('type', 'password');

        fireEvent.change(inputEl, { target: { value: 'SuperLucky13' } });
        expect(onChange).toHaveBeenCalled();
    });

    test('should render checkbox input field correctly', () => {
        const coreCheckbox = formFields[pages.PRIVACY.id].find(i => i.id === 'coreConsent');
        const { id, label, type, required } = coreCheckbox;

        props = { ...props, id, label, type, required };
        const { testInput, container } = renderFormField(props);
        const labelEl = container.querySelector('label');
        const inputEl = container.querySelector('input');
        expect(testInput).toBeInTheDocument();
        expect(labelEl).toBeInTheDocument();
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).not.toBeRequired();
        expect(inputEl).toHaveAttribute('type', 'checkbox');

        fireEvent.click(labelEl);
        expect(onChange).toHaveBeenCalled();
    });

});