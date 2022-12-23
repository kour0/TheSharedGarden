import Cookies from "js-cookie";

export function isAuthenticated() {
  const token = Cookies.get('token');
  return token && token.length > 10; 
}