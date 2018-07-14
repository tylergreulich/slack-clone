// Register

export interface RegisterMutationResponse {
  path: string;
  message: string;
  ok: boolean;
  errors: object;
}

export interface RegisterMutation {
  register: RegisterMutationResponse[] | null;
}

export interface RegisterMutationVariables {
  username: string;
  email: string;
  password: string;
}

// Login

export interface LoginMutationLoginErrors {
  path: string;
  message: string;
}

export interface LoginMutationLogin {
  errors: LoginMutationLoginErrors[] | null;
  sessionId: string | null;
}

export interface LoginMutation {
  login: LoginMutationLogin;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}
