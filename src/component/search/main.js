import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
export default class Main extends Component {
  static propTypes = {
    searchName: PropTypes.string.isRequired
  };
  state = {
    initView: true,
    loading: false,
    users: null,
    errorMsg: null
  };
  //组件接受新的属性时回调
  componentWillReceiveProps(newProps) {
    const { searchName } = newProps;
    //更新状态 发请求
    this.setState({ initView: false, loading: true });
    const url = `https://api.github.com/search/users?q=${searchName}`;
    axios
      .get(url)
      .then(response => {
        //得到数据
        const result = response.data;
        console.log(result);
        const users = result.items.map(item => {
          return {
            name: item.login,
            url: item.html_url,
            avatarUrl: item.avatar_url
          };
        });
        this.setState({ loading: false, users });
        //更新状态成功
      })
      .catch(erros => {
        this.setState({ loading: false, errorMsg: 'error.message' });
      });
  }
  render() {
    const { initView, loading, users, errorMsg } = this.state;
    if (initView) {
      return <h2>Please insert key word {this.props.searchName}</h2>;
    } else if (loading) {
      return <h2>Loading Now...</h2>;
    } else if (errorMsg) {
      return <h2>{errorMsg}</h2>;
    } else {
      return (
        <div className='row'>
          {users.map((user, index) => {
            return (
              <div className='card' key={index}>
                <a href={user.url} targe='_blank'>
                  <img src={user.avatarUrl} style={{ width: 100 }} alt=''></img>
                </a>
                <p className='card-text'>{user.name}</p>
              </div>
            );
          })}
        </div>
      );
    }
  }
}
