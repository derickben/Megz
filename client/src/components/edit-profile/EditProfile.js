import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

 class CreateProfile extends Component {
   constructor(props) {
     super(props);
     this.state = {
       displaySocialInputs: false,
       handle: '',
       company: '',
       website: '',
       location: '',
       status: '',
       skills: '',
       githubusername: '',
       bio: '',
       twitter: '',
       facebook: '',
       linkedin: '',
       youtube: '',
       instagram: '',
       errors: {}
     };
     this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this); 
   }

   componentDidMount() {
     this.props.getCurrentProfile();
   }

   componentWillReceiveProps(nextProps) {
     if (nextProps.errors) {
       this.setState({errors: nextProps.errors});
     }

     if (nextProps.profile.profile) {
       const currentProfile = nextProps.profile.profile;

       //Bring skilss array back to CSV (Comma Seperated Value)
       const skillsCSV = currentProfile.skills.join(',');

       // If currentProfile fields does not exist, make it an empty string
       currentProfile.company = !isEmpty(currentProfile.company) ? currentProfile.company : "";
       currentProfile.website = !isEmpty(currentProfile.website) ? currentProfile.website : "";
       currentProfile.location = !isEmpty(currentProfile.location) ? currentProfile.location : "";
       currentProfile.githubusername = !isEmpty(currentProfile.githubusername) ? currentProfile.githubusername : "";
       currentProfile.bio = !isEmpty(currentProfile.bio) ? currentProfile.bio : "";
       currentProfile.social = !isEmpty(currentProfile.social) ? currentProfile.social : {};
       currentProfile.twitter = !isEmpty(currentProfile.social.twitter) ? currentProfile.social.twitter : "";
       currentProfile.facebook = !isEmpty(currentProfile.social.facebook) ? currentProfile.social.facebook : "";
       currentProfile.linkedin = !isEmpty(currentProfile.social.linkedin) ? currentProfile.social.linkedin : "";
       currentProfile.youtube = !isEmpty(currentProfile.social.youtube) ? currentProfile.social.youtube : "";
       currentProfile.instagram = !isEmpty(currentProfile.social.instagram) ? currentProfile.social.instagram : "";

       // Set component fields state
      this.setState({
        handle: currentProfile.handle,
        company: currentProfile.company,
        website: currentProfile.website,
        location: currentProfile.location,
        status: currentProfile.status,
        skills: skillsCSV,
        githubusername: currentProfile.githubusername,
        bio: currentProfile.bio,
        twitter: currentProfile.twitter,
        facebook: currentProfile.facebook,
        linkedin: currentProfile.linkedin,
        instagram: currentProfile.instagram,
        youtube: currentProfile.youtube
      });
     }
   }

   onChange (e)  {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history)
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup 
            name="twitter"
            placeholder="Twitter Profile URL"
            value={this.state.twitter}
            error={errors.twitter}
            icon="fab fa-twitter"
            onChange={this.onChange}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      )
    }

    // Select options for status
    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-dark">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>             
              <small style={{color: 'red'}} class="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup 
                  placeholder= "* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />

                <SelectListGroup 
                  placeholder= "Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={options}
                  info="Give us an idea of where you are at in your career"
                />

                <TextFieldGroup 
                  placeholder= "Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />

                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />

                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <div className="mb-3">
                    <button type="button"
                      onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    }} className="btn btn-dark">
                      Add Social Network Links
                    </button>
                    <span className="text-muted"> {'  '} Optional</span>
                </div>
                {socialInputs}
                <input type="submit" value="Submit" className="btn-btn-info"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  errors: PropTypes.object,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect (mapStateToProps, { createProfile, getCurrentProfile })(withRouter(CreateProfile)); 