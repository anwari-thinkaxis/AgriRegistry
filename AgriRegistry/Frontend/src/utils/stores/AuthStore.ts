import { makeAutoObservable } from "mobx";

class AuthStore {
    token: string | null = null;

    constructor() {
        makeAutoObservable(this);
        this.token = localStorage.getItem("token");
    }

    handleSetToken(newToken: string) {
        this.token = newToken;
        localStorage.setItem("token", newToken);
    }

    handleClearToken() {
        this.token = null;
        localStorage.removeItem("token");
    }
}

export default new AuthStore();
