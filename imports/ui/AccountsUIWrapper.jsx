import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountsUIWrapper extends Component {
  componentDidMount() {
    // Meteor Blaze 에 있는 render login buttons 사용하는 방법
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  render() {
    // placeholder container 입니다=여기에 결과가 랜더링 결과가 들어옴.
    return <span ref="container" />;
  }
}
