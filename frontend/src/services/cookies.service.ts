import Cookies from 'js-cookie'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class CookiesService {
  public static setRefreshToken(token: string): void {
    Cookies.set('refresh', token)
  }

  public static setAccessToken(token: string): void {
    Cookies.set('access', token)
  }

  public static setAuth(status: boolean): void {
    Cookies.set('isAuth', status.toString())
  }

  public static removeAccessToken(): void {
    Cookies.set('access', '')
  }

  public static removeRefreshToken(): void {
    Cookies.set('refresh', '')
  }

  public static getAccessToken(): string | undefined {
    return Cookies.get('access') 
  }

  public static getRefreshToken(): string | undefined {
    return Cookies.get('refresh') 
  }

  public static isAuth(): boolean {
    return Cookies.get('isAuth') === 'true'
  }
}

export { CookiesService }
