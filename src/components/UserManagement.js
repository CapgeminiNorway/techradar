import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { makeAdmin } from '../redux/actions/user.action';
import { WhiteButton } from './pages/GenerateWordCloud';

const UserManagement = () => {
  const { allUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const dispatchMakeAdmin = (user) => {
    debugger;
    dispatch(makeAdmin(user))
  }

  const [ admins, users ] = React.useMemo( () => {
    let _admins = [], _users = [];

    allUsers.forEach ( user => {
      if (user.role === "admin") _admins.push(user);
      else _users.push(user);
    })
    return [_admins, _users]
  }, [ allUsers ])
  return (
    <Wrapper>
      <h1>Administrators ({admins.length})</h1>
      {admins.map(user => {

          return (
            <UserItem key={user.email}>
              {user.email}
            </UserItem>
          )
      })}

      <h1>Users ({users.length})</h1>

      {users.map(user => {
          return (
            <UserItem key={user.email}>
              {user.email}
              <WhiteButton onClick={() => dispatchMakeAdmin(user)}>Make admin</WhiteButton>
            </UserItem>
          )
      })}
    </Wrapper>
  )
};

export default React.memo(UserManagement);

const UserItem = styled.div`
  padding: 0 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  button {
    padding: 2px 4px;
  }

`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  h1 {
    font-size: 20px;
    margin: 20px 0;
  }
`;

