import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor'; // Add Meteor Package <==
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx'; // Add compo def

// App compo => 예제 앱 전체를 여기에 정의
class App extends Component {

  handleSubmit(event) {
    event.preventDefault();

    // ref="textInput" 를 찾아서 value 를 text 에 대입
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text,
      createdAt: new Date(),           // current time
      owner: Meteor.userId(),          // id of logged in user <==
      username: Meteor.user().username // username of logged in user <==
    });

    // DB instert 후 폼에 있는 값을 ''로 지위줌
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>

          <AccountsUIWrapper />  {/* Add compo tag  */}

            { this.props.currentUser ? // 로그인 했을 때만 보이도록 제어문 추가 <==
              <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                <input
                  type="text"
                  ref="textInput"
                  placeholder="Type to add new tasks"
                />
              </form> : ''
            }

        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}


App.propTypes = {
  tasks: PropTypes.array.isRequired,
  currentUser: PropTypes.object,  // 데이터 형식이 object 임을 정의 <==
};

export default createContainer(() => {
  return {
      tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
      currentUser: Meteor.user(),  // App compo 에서 사용하도록 등록 <==

  };
}, App);
