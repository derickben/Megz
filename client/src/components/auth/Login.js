import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authAction';
import TextFieldGroup from "../common/TextFieldGroup";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.enteredValue = this.enteredValue.bind(this);
    this.onLogin = this.onLogin.bind(this); 
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  enteredValue (e)  {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLogin(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">Sign in to your DevConnector account</p>
            <form noValidate onSubmit={this.onLogin}>
              <TextFieldGroup 
                placeholder="Email Address"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.enteredValue}
                error={errors.email}
              />

              <TextFieldGroup 
                placeholder="Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.enteredValue}
                error={errors.password}
              />
            
              <input type="submit" className="btn btn-info btn-block mt-4" value="Submit"/>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);