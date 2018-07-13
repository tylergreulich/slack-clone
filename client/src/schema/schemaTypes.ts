export interface RegisterMutationResponse {
  path: string;
  message: string;
}

export interface RegisterMutation {
  register: RegisterMutationResponse[] | null;
}

export interface RegisterMutationVariables {
  username: string;
  email: string;
  password: string;
}
