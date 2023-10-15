/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';

export const LOGIN_STUDENT_START = 'boilerplate/App/LOGIN_STUDENT_START';
export const LOGIN_STUDENT_SUCCESS = 'boilerplate/App/LOGIN_STUDENT_SUCCESS';
export const LOGIN_STUDENT_FAILURE = 'boilerplate/App/LOGIN_STUDENT_FAILURE';

export const LOGIN_STUDENT_WITH_TOKEN =
  'boilerplate/App/LOGIN_STUDENT_WITH_TOKEN';

export const LOGOUT_STUDENT = 'boilerplate/App/LOGOUT_STUDENT';

export const REMOVE_NOTIF_DOT = 'boilerplate/App/REMOVE_NOTIF_DOT';
