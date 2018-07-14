import * as React from 'react';
import { Typography } from '@material-ui/core';
import {
  RegisterContainer,
  RegisterForm,
  RegisterButton
} from '../StyledComponents/Register';
import RegisterInput from './RegisterInput';
import { ThemeWrapper } from '../StyledComponents/MuiTheme';
import { TextField } from '@material-ui/core';

import gql from 'graphql-tag';
import { graphql, ChildMutateProps } from 'react-apollo';
import {
  RegisterMutation,
  RegisterMutationVariables
} from '../../schema/schemaTypes';
import { normalizeErrors } from '../../utils/normalizeErrors';
import { NormalizedErrorMap } from '../../types/normalizedErrorMap';

import { RouteComponentProps } from 'react-router-dom';

interface RegisterProps extends RouteComponentProps<any> {
  children: (
    data: {
      submit: (
        values: RegisterMutationVariables
      ) => Promise<NormalizedErrorMap | null>;
    }
  ) => JSX.Element | null;
}

interface Props {
  variant: string;
  color: string;
}

interface State {
  username: string;
  usernameError: string;
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
}

class Register extends React.Component<
  ChildMutateProps<
    RegisterProps & Props,
    RegisterMutation,
    RegisterMutationVariables
  >
> {
  public state = {
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: ''
  };

  public onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value }: any = event.currentTarget;
    this.setState({ [name]: value });
  };

  public onSubmitHandler = async () => {
    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: ''
    });

    const { username, email, password } = this.state;
    const response = await this.props.mutate({
      variables: { username, email, password }
    });

    const { ok, errors }: any = response.data.register;

    if (ok) {
      this.props.history.push('/login');
    } else {
      const err = {};
      errors.forEach(({ path, message }: any) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }

    console.log(response);
  };

  public render() {
    const {
      username,
      email,
      password,
      usernameError,
      emailError,
      passwordError
    } = this.state;

    return (
      <RegisterContainer>
        <ThemeWrapper>
          <RegisterForm>
            <Typography variant="display2">Register</Typography>
            <RegisterInput
              changed={this.onChangeHandler}
              value={username}
              name="username"
              error={!!usernameError}
              label={usernameError ? usernameError : 'Username'}
            />
            <RegisterInput
              changed={this.onChangeHandler}
              value={email}
              name="email"
              error={!!emailError}
              label={emailError ? emailError : 'Email'}
            />
            <RegisterInput
              changed={this.onChangeHandler}
              type="password"
              value={password}
              name="password"
              error={!!passwordError}
              label={passwordError ? passwordError : 'Password'}
            />
            <RegisterButton
              onClick={this.onSubmitHandler}
              color="primary"
              variant="contained"
            >
              Submit
            </RegisterButton>
          </RegisterForm>
        </ThemeWrapper>
      </RegisterContainer>
    );
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql<
  RegisterProps,
  RegisterMutation,
  RegisterMutationVariables
>(registerMutation)(Register);
