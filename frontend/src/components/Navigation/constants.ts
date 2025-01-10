import { QUESTION_CATEGORY } from '../../types/game';

export interface MENU_OPTION {
  label: string;
  route: ROUTES;
}

export enum ROUTES {
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  ACCOUNT = '/account',
  LOG_OUT = '/logout',
  MAIN = '/'
}

export const MAIN_PAGES = [];
export const LOGGED_IN_USER_MENU_OPTIONS: MENU_OPTION[] = [
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

export const CATEGORIES_NAMES: Record<QUESTION_CATEGORY, string> = {
  [QUESTION_CATEGORY.ASTRONOMY]: 'Astronomia',
  [QUESTION_CATEGORY.BIOLOGY]: 'Biologia',
  [QUESTION_CATEGORY.CHEMISTRY]: 'Chemia',
  [QUESTION_CATEGORY.FISHING]: 'Wędkarstwo',
  [QUESTION_CATEGORY.FOOTBALL]: 'Piłka nożna',
  [QUESTION_CATEGORY.GEOGRAPHY]: 'Geografia',
  [QUESTION_CATEGORY.POLISH_CINEMA]: 'Polskie kino',
  [QUESTION_CATEGORY.POLITICS]: 'Polityka'
};
