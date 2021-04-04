import { actions } from '../config/appConfig';

const previous = (current, length = 1) => (current - 1 + length) % length;

const next = (current, length = 1) => (current + 1) % length;

export function reducer(state, action) {
    switch (action.type) {
        case actions.DONE:
            return { ...state, done: true, step: state.pagesMap.size - 1 };
        case actions.PRIVACY_FORM:
        case actions.USER_FORM:
            return {...state, inputValues: { ...state.inputValues, ...Object.fromEntries(action.payload)} };
        case actions.ERROR:
            // overwrite prev errors Map so React can compare state correctly
            return { ...state, errors: new Map(state.errors.set(action.payload.key, action.payload.value)) };
        case actions.NEXT:
            const nextStep = next(state.step, state.pagesMap.size );
            return { ...state, step: nextStep, done: nextStep === state.pagesMap.size - 1 }
        case actions.PREV:
            return { ...state, step: previous(state.step, state.pagesMap.size ), done: false }
        default:
            throw new Error(`Invalid action type: "${action.type}"`);
    }
}