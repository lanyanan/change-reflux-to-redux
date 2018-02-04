import React, { Component} from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

console.log(PropTypes)

export default class AddTodo extends Component {
  render() {
    return (
      <div>
        <input type='text' ref='input' />
        <button onClick={e => this.handleClick(e)}>
          Add
        </button>
        {this.props.text.map((item, index)=>{
            return <p key={index}>{item.text}</p>
        })}
      </div>
    );
  }

  handleClick(e) {
    const node = ReactDOM.findDOMNode(this.refs.input);
    const text = node.value.trim();
    console.log(text)
    this.props.onAddClick(text);
    node.value = '';
  }
}

AddTodo.propTypes = {
  onAddClick: PropTypes.func.isRequired
}