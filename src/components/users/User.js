import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function User(props) {
  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = props.user;
  const params = useParams();

  useEffect(() => {
    props.getUser(params);
  });

  return (
    <div>
      <p>user</p>
    </div>
  );
}
