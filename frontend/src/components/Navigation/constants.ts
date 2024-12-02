export interface MENU_OPTION {
  label: string;
  route: ROUTES;
}

export enum ROUTES {
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  ACCOUNT = '/account',
  LOG_OUT = '/logout',
  MAIN = '/',
  CREATE_GAME = '/create-game'
}

export const MAIN_PAGES = ['Jak grać?', 'Ranking'];
export const LOGGED_IN_USER_MENU_OPTIONS: MENU_OPTION[] = [
  {
    label: 'Account',
    route: ROUTES.ACCOUNT
  },
  {
    label: 'Logout',
    route: ROUTES.LOG_OUT
  }
];
export const ANONYMOUS_USER_MENU_OPTIONS: MENU_OPTION[] = [
  {
    label: 'Sign in',
    route: ROUTES.SIGN_IN
  },
  {
    label: 'Sing up',
    route: ROUTES.SIGN_UP
  }
];
