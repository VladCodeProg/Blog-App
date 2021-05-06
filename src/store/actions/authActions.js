import { AUTH } from './actionTypes';

export function onAuthChange(payload) {
    return {
        type: AUTH,
        payload
    }
}