import { reducer } from './reducer';
import { actions, initialState } from '../config/appConfig';

describe('reducer', () => {

    test('should move to next step', () => {
        const { step } = reducer(initialState, { type: actions.NEXT, payload: 0 });
        expect(step).toEqual(1);
    });

    test('should move to previous step', () => {
        const { step } = reducer({...initialState, step: 1}, { type: actions.PREV, payload: 1 });
        expect(step).toEqual(0);
    });

    test('should mark done as true when reaches the end of the journey', () => {
        const { done } = reducer(initialState, { type: actions.DONE });
        expect(done).toEqual(true);
    });

    test('should update user form input values', () => {
        const { inputValues } = reducer(initialState, { type: actions.USER_FORM, payload: [[ 'name', 'My name'], [ 'email', 'me@me.com' ], [ 'password', 'SuperLucky13' ]] });
        expect(inputValues).toEqual(expect.objectContaining({
            name: 'My name',
            email: 'me@me.com',
            password: 'SuperLucky13'
        }));
    });

    test('should update privacy form input values', () => {
        const { inputValues } = reducer(initialState, { type: actions.PRIVACY_FORM, payload: [[ 'coreConsent', 'true'], [ 'thirdpartyConsent', 'false' ]] });
        expect(inputValues).toEqual(expect.objectContaining({
            coreConsent: 'true',
            thirdpartyConsent: 'false'
        }));
    });

    test('should update error state', () => {
        const { errors } = reducer(initialState, { type: actions.ERROR, payload: { key: 'email', value: 'Invalid email address' } });
        expect(errors.has('email')).toEqual(true);
        expect(errors.has('name')).toEqual(false);
    });

    test('should throw error when called with invalid action type', () => {
        expect(() => reducer({}, { type: 'INVALID', payload: undefined })).toThrowError('Invalid action type: "INVALID"');
    });
});