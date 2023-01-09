import Cookies from 'js-cookie';

/**
 * If the token cookie exists and is longer than 10 characters, return true
 * @returns {Boolean} value.
 */
export function isAuthenticated() {
  const token = Cookies.get('token');
  return token && token.length > 10;
}