import React, {Component, PropTypes} from 'react';
import {Tasks} from '../api/tasks.js';

// Task compo - single todo item을 여기에 정의
export default class Task extends Component {

  toggleChecked() {
    // checked property를 반대 값으로 update 한다. !=반대
    Tasks.update(this.props.task._id, {
      $set: {
        checked: !this.props.task.checked
      }
    });
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }

  render() {
    // CSS class 는 React에서 className 으로 사용한다.
    // 그래서 CSS style 을 쉽게 변경할 수 있다. 목적) className='checked'
    const taskClassName = this.props.task.checked
      ? 'checked'
      : '';

    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </button>

        <input type="checkbox" readOnly checked={this.props.task.checked} onClick={this.toggleChecked.bind(this)}/>

        {/* 아래 3줄추가 = text 앞에 username을 보여준다 */}
        <span className="text">
          <strong>{this.props.task.username}</strong>: {this.props.task.text}
        </span>
      </li>
    );
  }
}

Task.propTypes = {
  // Task compo 는 App 에서 상속 받은 task 를 사용한다.
  // propTypes 는 Data type(자료형)을 정의하는 용도로 사용한다.
  task: PropTypes.object.isRequired
};
