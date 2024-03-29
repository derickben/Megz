import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction';
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.enteredValue = this.enteredValue.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this); 
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  enteredValue (e)  {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitRegistration(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);

    
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Megz account</p>
              <form noValidate onSubmit={this.submitRegistration}>
              <TextFieldGroup 
                placeholder="Name"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.enteredValue}
                error={errors.name}
              />

              <TextFieldGroup 
                placeholder="Email Address"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.enteredValue}
                error={errors.email}
                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
              />

              <TextFieldGroup 
                placeholder="Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.enteredValue}
                error={errors.password}
              />

              <TextFieldGroup 
                placeholder="Confirm Password"
                type="password"
                name="password2"
                value={this.state.password2}
                onChange={this.enteredValue}
                error={errors.password2}
              />

                <input type="submit" className="btn btn-info btn-block mt-4" value="Submit"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default  connect(mapStateToProps, { registerUser })(withRouter(Register));