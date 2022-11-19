export interface signInArg {
  login: string;
  password: string;
}

export interface signUpArg extends signInArg {
  name: string;
}

export interface signInResp {
  token: string;
}

export interface signUpResp {
  _id: 'string';
  name: 'string';
  login: 'string';
}
