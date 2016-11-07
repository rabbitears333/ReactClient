
const ROOT_URL = 'http://localhost:3090';
import axios from 'axios';
import {browserHistory} from 'react-router';
import {AUTH_ERROR, AUTH_USER, UNAUTH_USER, FETCH_MESSAGE} from '../actions/type';
export function signinUser({email, password}) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signin`, {email, password}).then(
        response => {
            dispatch({type: AUTH_USER});
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/feature');
        }
        ).catch(() => {
            dispatch(authError('bad Login info'));
        });


    }}
    export function authError(error) {
        return {
            type: AUTH_ERROR,
            payload: error
        };

    //submit email password to server
    //if request is good, update state to indicate user is authenticated
    //save jwt token
    //redirect ot route 'feature'
    //if request is bad..
    //show error to user

}
export function signupUser({email, password}) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, {email, password}).then(
            response => {
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');
            }
        ).catch(response =>
            dispatch(authError(response.data.error))
        );


    }}

export function fetchMessage(){
    return function(dispatch) {
        axios.get(ROOT_URL, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                });
            });
    }
}

export function signoutUser(){
    localStorage.removeItem('token');
    return {type:UNAUTH_USER};
}