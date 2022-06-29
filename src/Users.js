import React from 'react';

const Users = ({ users, userId, destroy, create })=> {
  return (
    <ul>
      <button onClick={ create }>Add A User</button>
      <li className={ !userId ? 'selected': ''}>
        <a href='#'>Users</a>
      </li>
      {
        users.map( user => {
          return (
            <li className={ user.id === userId*1 ? 'selected': ''} key={ user.id }>
              <a href={`#${user.id}`}>
                { user.name }
              </a>
              <button onClick= {()=> destroy(user)}>x</button>
            </li>
          );
        })
      }
    </ul>
  );
}

export default Users;
