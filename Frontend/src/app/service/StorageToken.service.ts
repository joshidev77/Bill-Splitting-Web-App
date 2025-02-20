import { StorageKeys } from "../Enums/enum";

export class StorageTokenService {
    setToken(token: string): void {
        sessionStorage.setItem(StorageKeys.TOKEN, token);
    }

    // Retrieve token from localStorage
    getToken(): string | null {
        return sessionStorage.getItem(StorageKeys.TOKEN);
    }

    // Remove token from localStorage
    removeToken(): void {
        sessionStorage.removeItem(StorageKeys.TOKEN);
    }
}
