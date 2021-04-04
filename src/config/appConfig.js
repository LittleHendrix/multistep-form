export const actions = {
    DONE: 'DONE',
    PRIVACY_FORM: 'PRIVACY_FORM',
    USER_FORM: 'USER_FORM',
    ERROR: 'ERROR',
    NEXT: 'NEXT',
    PREV: 'PREV'
}

/**
 * add additional pages and specify the step prop
 */
export const pages = {
    USER: { step: 0, id: 'USER', label: 'User' },
    PRIVACY: { step: 1, id: 'PRIVACY', label: 'Privacy' },
    DONE: { step: 2, id: 'DONE', label: 'Done' }
}

/**
 * generate journey map order by step prop
 * use to navigate as Map maintains key order
 */
const pagesMap = new Map();
const generateJourneyMap = (pagesObj => {
    Object.entries(pagesObj).sort((a, b) => a[1].step - b[1].step).forEach(([key, value]) => {
        pagesMap.set(key, value);
    });
})(pages);

/**
 * form config object
 * add additional fields to a form, or an additional form
 * make sure the {key} value matches what is specified in pages object
 */
export const formFields = {
    [pages.USER.id]: [
        { id: 'name', label: 'Name', type: 'text', required: true, validationSchema: [[/.*\S/g, 'This field is required.']] },
        { id: 'role', label: 'Role', type: 'text', required: false, validationSchema: null },
        { id: 'email', label: 'Email', type: 'email', required: true, validationSchema: [
            [/.*\S/g, 'This field is required.'], 
            [/^[a-z0-9._+-]+@[a-z0-9-]+(\.[a-z]{2,4})+$/g, 'Invalid email address.']
        ] },
        { id: 'password', label: 'Password', type: 'password', required: true, validationSchema: [
            [/.*\S/g, 'This field is required.'],
            [/[A-Za-z0-9]{9,}$/g, 'Password must contain at least 9 characters.'],
            [/^(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9]{9,}$/g, 'Password must contain at least one UPPERCASE and one lowercase character.'],
            [/^(?=.*[0-9])[A-Za-z0-9]{9,}$/g, 'Password must contain at least one number.'],
        ] },
    ],
    [pages.PRIVACY.id]: [
        { id: 'coreConsent', label: 'Receive updates about Tray.io products by email.', type: 'checkbox', required: false, validationSchema: null },
        { id: 'thirdpartyConsent', label: 'Receive communication by email about other products created by Tray.io team.', type: 'checkbox', required: false, validationSchema: null }
    ],
    [pages.DONE.id]: [

    ]
}

/**
 * create an obj from each step form, with each field id as key
 * use to populate initial state
 *  { name: '', role: '', ... }
 */
const formFieldsObject = Object.keys(formFields).reduce((result, formKey) => (
                                        {...result, ...formFields[formKey].reduce((allFields, current) => ({...allFields, [current.id]: '' }), {})}
                                    ), {});

export const initialState = {
    pagesMap,
    step: pages.USER.step,
    done: false,
    errors: new Map(),
    inputValues: formFieldsObject
}