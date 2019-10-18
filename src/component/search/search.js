import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class Search extends Component {
  static propTypes = {
    setSearchName: PropTypes.func.isRequired
  };
  search = () => {
    const searchName = this.input.value.trim();
    if (searchName) {
      this.props.setSearchName(searchName);
    }
  };

  render() {
    return (
      <div>
        <section>
          <h3>Search Users</h3>
          <input
            type='text'
            placeholder='print the name'
            ref={input => (this.input = input)}
          ></input>
          <button type='button' onClick={this.search}>
            Search
          </button>
        </section>
      </div>
    );
  }
}
