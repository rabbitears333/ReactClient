

import React,{Component} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions';
class Signup extends Component{
    handleFormSubmit(formProps){
        this.props.signupUser(formProps);
    }
    renderAlert(){
        if(this.props.errorMessage){
            return (
                <div className="alert alert-danger">
                    <strong>Error!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }
    render(){
        const {handleSubmit, fields:{email, password, passwordConfirm}} = this.props;


        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email</label>
                    <input className="form-control" {...email}></input>
                    {email.touched && email.error && <div className="error"> {email.error}</div>}

                </fieldset>
                <fieldset className="form-group">
                    <label>Password</label>
                    <input className="form-control" type="password"{...password}></input>
                    {password.touched && password.error && <div className="error"> {password.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label>Confirm Password</label>
                    <input className="form-control" type="password" {...passwordConfirm}></input>
                    {passwordConfirm.touched && passwordConfirm.error && <div className="error"> {passwordConfirm.error}</div>}

                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign UP</button>
            </form>
        );
    }
}
/*function validate(formProps){
    const errors = {};

    if (!formProps.password ){
        errors.password= 'please enter value';
    }
    if (!formProps.email) {
        errors.email = 'please enter email';
    }
    if (!formProps.passwordConfirm) {
        errors.passwordConfirm = 'please enter email';
    }
    if (formProps.password !== formProps.passwordConfirm){
        errors.password = 'Passwords must match';
    }
    return errors;
}*/
const validate = formProps => {
    const errors = {}
    if (!formProps.password){
        errors.password= 'pass word required'
    }
    if (!formProps.email){
        errors.email= 'email required'    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!formProps.passwordConfirm){
        errors.passwordConfirm = 'invalid password'
    }
    return errors
}
function mapStateToProps(state){
    return { errorMessage: state.auth.error};
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
}, mapStateToProps, actions)(Signup);