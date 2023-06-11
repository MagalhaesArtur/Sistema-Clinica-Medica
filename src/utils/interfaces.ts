export interface UserProps {
  username: string;
  email: string;
  password: string;
}

interface Authority {
  authority: String;
}

export interface UserAuthProps {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: Array<Authority>;
  credentialsNonExpired: boolean;
  email: String;
  enabled: boolean;
  id: String;
  password: null;
  username: String;
}
