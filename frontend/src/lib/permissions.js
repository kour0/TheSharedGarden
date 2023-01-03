import Cookies from 'js-cookie';


export const isLoggedIn = () => Cookies.get('token') ? true : false;
