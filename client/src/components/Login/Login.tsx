import * as React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';

import { graphql, ChildMutateProps } from 'react-apollo';
import gql from 'graphql-tag';
import {
  LoginMutation,
  LoginMutationVariables
} from '../../schema/schemaTypes';
import { RouteComponentProps } from 'react-router-dom';

import { normalizeErrors } from '../../utils/normalizeErrors';
import { NormalizedErrorMap } from '../../types/normalizedErrorMap';

import {
  RegisterContainer,
  RegisterForm,
  RegisterButton
} from '../StyledComponents/Register';
import RegisterInput from '../Register/RegisterInput';
import { ThemeWrapper } from '../StyledComponents/MuiTheme';
import { Typography } from '@material-ui/core';

interface LoginProps extends RouteComponentProps<any> {
  onSessionId?: (sessionId: string) => void;
  children: (
    data: {
      submit: (
        values: LoginMutationVariables
      ) => Promise<NormalizedErrorMap | null>;
    }
  ) => JSX.Element | null;
}

class Login extends React.Component<
  ChildMutateProps<LoginProps, LoginMutation, LoginMutationVariables>
> {
  constructor(props: any) {
    super(props);
    extendObservable(this, {
      email: '',
      password: ''
    });
  }

  public onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    this[name] = value;
  };

  public onSubmitHandler = async () => {
    const { email, password }: any = this;
    const response = await this.props.mutate({
      variables: {
        email,
        password
      }
    });
    const { ok, token, refreshToken }: any = response.data.login;

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    }
  };

  public render() {
    const { email, password }: any = this;
    const { token } = localStorage;

    return (
      <RegisterContainer
        style={{ flexDirection: 'column', justifyContent: 'center' }}
      >
        <ThemeWrapper>
          <RegisterForm>
            <Typography variant="display2">Login</Typography>
            <RegisterInput
              changed={this.onChangeHandler}
              value={email}
              name="email"
              label="Email"
            />
            <RegisterInput
              changed={this.onChangeHandler}
              value={password}
              name="password"
              type="password"
              label="Password"
            />
          </RegisterForm>
          <RegisterButton
            onClick={this.onSubmitHandler}
            color="primary"
            variant="contained"
          >
            Submit
          </RegisterButton>
        </ThemeWrapper>
      </RegisterContainer>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        message
        path
      }
    }
  }
`;

export default graphql<LoginProps, LoginMutation, LoginMutationVariables>(
  loginMutation
)(observer(Login));
