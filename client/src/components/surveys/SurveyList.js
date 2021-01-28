import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      const generateKey = (title) => {
        
        return `${(Math.floor(Math.random() * 40))} + ${(Math.floor(Math.random() * 50))} + ${(Math.floor(Math.random() * 50))}` ;
    }
 
      return (
      <div key={ generateKey(survey.title)} className="row">
      
        <div className="card   green lighten-5" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>
              {survey.body}
            </p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action green lighten-5">
            <a style={{ color:"#2F4F4F", fontWeight: "bold"}}>Yes: {survey.yes}</a>
            <a style={{ color:"#2F4F4F", fontWeight: "bold"}}>No: {survey.no}</a>
          </div>
         </div>
        
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderSurveys()}
      </div>
    );
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);