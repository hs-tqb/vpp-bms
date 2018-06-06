import Cookies from 'js-cookie'
const TokenKey = 'x-access-token'

export default {
  getToken() {
    return Cookies.get(TokenKey) || '';
  },
  setToken(token, expires={expires:30, path:'/'}) {
    Cookies.set(TokenKey, token, expires);
  },
  getRandomLenNum(len, date) {
    let random = '';
    random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len ? len : 4);
    if (date) random = random + Date.now();
    return random;
  }
}
