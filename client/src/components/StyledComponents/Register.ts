import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const RegisterContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 30rem;
  margin: 0 auto;
`;

export const RegisterButton = styled(Button)`
  background-color: #63c1a0;
`;
