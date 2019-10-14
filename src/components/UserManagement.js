import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { makeAdmin } from '../redux/actions/user.action';

const UserManagement = () => {
  const { allUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const dispatchMakeAdmin = (user) => dispatch(makeAdmin(user))

  return (
    <Wrapper>
      {allUsers.map ( user => (
        <UserItem>
          {user.email}
          {user.role}
          <button onClick={() => dispatchMakeAdmin(user)}>Make admin</button>
        </UserItem>
      ))}
    </Wrapper>
  )
};

export default React.memo(UserManagement);

const UserItem = styled.div`

`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

 
`;

