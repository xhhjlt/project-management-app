export interface User {
  _id: string;
  name: string;
  login: string;
}

export interface SignInArg {
  login: string;
  password: string;
}

export interface SignUpArg extends SignInArg {
  name: string;
}

export interface SignInResp {
  token: string;
}
