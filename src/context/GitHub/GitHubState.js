import React, { useReducer } from 'react';
import axios from 'axios';
import GitHubContext from './GitHubContext';
import GitHubReducer from './GitHubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../Types';

let githubClientToken;
if (process.env.NODE_ENV !== 'production') {
  githubClientToken = process.env.REACT_APP_GITHUB_TOKEN;
} else {
  githubClientToken = process.env.GITHUB_CLIENT_TOKEN;
}

const GitHubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GitHubReducer, initialState);

  const github = axios.create({
    baseURL: 'https://api.github.com',
    headers: { Authorization: githubClientToken },
  });

  // Search Users
  const searchUsers = async text => {
    setLoading();

    const res = await github.get(`/search/users?q=${text}`);

    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };

  // Get User
  const getUser = async username => {
    setLoading();

    const res = await github.get(`/users/${username}?`);

    dispatch({ type: GET_USER, payload: res.data });
  };

  // Get Repos
  const getUserRepos = async username => {
    setLoading();

    const res = await github.get(
      `users/${username}/repos?per_page=5&sort=created:asc`
    );

    dispatch({ type: GET_REPOS, payload: res.data });
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GitHubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        getUser,
        getUserRepos,
        clearUsers,
      }}
    >
      {props.children}
    </GitHubContext.Provider>
  );
};

export default GitHubState;
