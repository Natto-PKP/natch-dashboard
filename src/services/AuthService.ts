interface IAuth {
  accessToken: string;
  tokenType: string;
  refreshToken?: string | null;
}

export class AuthService {
  static setAuthInLocalStorage(data: IAuth) {
    localStorage.setItem('access_token', data.accessToken);
    localStorage.setItem('token_type', data.tokenType);

    if (data.refreshToken) localStorage.setItem('refresh_token', data.refreshToken);
    else localStorage.removeItem('refresh_token');
  }

  static clearAuthInLocalStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('refresh_token');
  }
}
