import * as React from 'react';
import { Typography } from '@material-ui/core';
import { RegisterContainer, RegisterButton } from './StyledComponents/Register';
import RegisterInput from './Register/RegisterInputs';
import { ThemeWrapper } from '../components/StyledComponents/MuiTheme';

import gql from 'graphql-tag';
import { graphql, ChildMutateProps } from 'react-apollo';
import {
  RegisterMutation,
  RegisterMutationVariables
} from '../schema/schemaTypes';
import { normalizeErrors } from '../utils/normalizeErrors';
import { NormalizedErrorMap } from '../types/normalizedErrorMap';

interface Props {
  children: (
    data: {
      submit: (
        values: RegisterMutationVariables
      ) => Promise<NormalizedErrorMap | null>;
    }
  ) => JSX.Element | null;
}

interface State {
  username: string;
  email: string;
  password: string;
}

class Register extends React.Component<
  ChildMutateProps<Props, RegisterMutation, RegisterMutationVariables>
> {
  public state = {
    username: '',
    email: '',
    password: ''
  };

  public onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value }: any = event.currentTarget;
    this.setState({ [name]: value });
  };

  public onSubmitHandler = () => {
    this.props
      .mutate({
        variables: this.state
      })
      .then((res: any) => console.log(res));
  };

  public render() {
    const { username, email, password } = this.state;

    return (
      <>
        <ThemeWrapper>
          <RegisterContainer>
            <Typography variant="display2">Register</Typography>
            <RegisterInput
              changed={this.onChangeHandler}
              placeholder="Username"
              value={username}
              name="username"
            />
            <RegisterInput
              changed={this.onChangeHandler}
              placeholder="Email"
              value={email}
              name="email"
            />
            <RegisterInput
              changed={this.onChangeHandler}
              placeholder="Password"
              type="password"
              value={password}
              name="password"
            />
            <RegisterButton
              onClick={this.onSubmitHandler}
              color="primary"
              variant="contained"
            >
              Submit
            </RegisterButton>
          </RegisterContainer>
        </ThemeWrapper>
      </>
    );
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password)
  }
`;

export default graphql<Props, RegisterMutation, RegisterMutationVariables>(
  registerMutation
)(Register);
