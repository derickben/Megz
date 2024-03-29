import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import Moment from 'react-moment';
import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }
  render() {
    const experience = this.props.userExperience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="DD/MMM/YYYY">{exp.from}</Moment> -
          
          <Moment format="DD/MMM/YYYY">{exp.current? (new Date().toISOString().slice(0,10)) : exp.to}</Moment>
          </td>
        <td><button className="btn btn-danger" onClick={this.onDeleteClick.bind(this, exp._id)}>Delete</button></td>
      </tr>
    ))
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th></th>
            </tr>
              {experience}
          </thead>
        </table>
      </div>
    )
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
}


export default connect (null, { deleteExperience })(Experience);