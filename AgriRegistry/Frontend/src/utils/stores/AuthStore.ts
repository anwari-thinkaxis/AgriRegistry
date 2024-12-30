/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from "mobx";
import { jwtDecode } from "jwt-decode";

class AuthStore {
    token: string | null = null;

    constructor() {
        makeAutoObservable(this);
        this.token = localStorage.getItem("token");
    }

    // Set a new token and save it to localStorage
    handleSetToken(newToken: string) {
        this.token = newToken;
        localStorage.setItem("token", newToken);
    }

    // Clear the token from store and localStorage
    handleClearToken() {
        this.token = null;
        localStorage.removeItem("token");
    }

    // Decode the current token if available
    decodeToken(): any | null {
        if (this.token) {
            try {
                return jwtDecode(this.token);
            } catch (error) {
                console.error("Error decoding token:", error);
                return null;
            }
        }
        console.warn("No token available for decoding");
        return null;
    }

    // Fetch specific claim: Farm Manager ID (sub)
    getFarmManagerId(): string | null {
        const decoded = this.decodeToken();
        if (decoded && decoded.sub) {
            return decoded.sub; // Return the 'sub' claim
        }
        console.warn("FarmManagerId (sub) not found in token");
        return null;
    }
}

export default new AuthStore();
