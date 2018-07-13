import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';

export const RegisterContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 20rem;
  margin: 0 auto;
`;

export const RegisterInput = styled(TextField)`
  width: 20rem;
`;

export const RegisterButton = styled(Button)`
  background-color: #63c1a0;
`;
