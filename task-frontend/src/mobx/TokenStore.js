import { observable, action } from "mobx";


class TokenStore {
  @observable token = '';
  @observable isLoggedIn = false;

  @action setToken(token) {
          this.token = token;
          this.isLoggedIn = true;
}

}

export default TokenStore;
