import React, { Component } from 'react'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.enteredValue = this.enteredValue.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this); 
  }

  enteredValue (e)  {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitRegistration(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    console.log(user);
  }

  render() {
    return (
      <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">Sign in to your DevConnector account</p>
            <form onSubmit={this.submitRegistration}>
              <div className="form-group">
                <input type="email" className="form-control form-control-lg" placeholder="Email Address" 
                name="email" value={this.state.email} onChange={this.enteredValue}/>
              </div>
              <div className="form-group">
                <input type="password" className="form-control form-control-lg" placeholder="Password" 
                name="password" value={this.state.password} onChange={this.enteredValue}/>
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" value="Submit"/>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Login;