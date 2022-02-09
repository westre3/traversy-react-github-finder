import React, { useContext, useState } from 'react';
import GitHubContext from '../../context/GitHub/GitHubContext';
import AlertContext from '../../context/Alert/AlertContext';

function Search() {
  const githubContext = useContext(GitHubContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  let [text, setText] = useState('');

  const onChange = e => {
    setText(e.target.value);
  };

  const onSubmit = e => {
    if (text === '') {
      setAlert('Please enter something', 'light');
    } else {
      githubContext.searchUsers(text);
      setText('');
    }

    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default Search;
