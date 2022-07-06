export class AuthService {
    static isAuthenticated() {
      return AuthService.getToken() != null;
    }
  
    static saveToken(token) {
      sessionStorage.setItem("token", JSON.stringify(token));
    }
  
    static saveCurrentUserData(data) {
      sessionStorage.setItem("current-user", JSON.stringify(data));
    }
  
    static getCurrentUserData() {
      return JSON.parse(sessionStorage.getItem("current-user"));
    }
  
    static getToken(tokenType = "token") {
      try {
        let [token] = document.cookie
          ? document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              .split("=")
          : [];
  
        if (!token || !token.trim().length) {
          // Read from sessionStorage
          const storedToken = sessionStorage.getItem("token");
          const tokenPayload = storedToken ? JSON.parse(storedToken) : null;
          if (tokenPayload != null) {
            token = tokenPayload[tokenType];
          }
        }
  
        return token;
      } catch (err) {
        console.error(err);
        return null;
      }
    }
  }
  