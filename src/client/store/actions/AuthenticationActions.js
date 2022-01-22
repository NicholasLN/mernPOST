import axios from "axios";

class AuthenticationActions {
  constructor() {
    this.auth = axios.create({
      baseURL: "/api",
      withCredentials: true,
    });
  }
  login(username, password, rememberMe = false) {
    // If there's a 406 error, the user is already logged in, return an error message saying so.
    return this.auth
      .post("/auth/login", { username, password, rememberMe })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return {
          error: error.response.data.message,
        };
      });
  }
  register(username, password, email, survivorName, survivorLocation) {
    return this.auth
      .post("/auth/signup", {
        username,
        password,
        email,
        survivorName,
        survivorLocation,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return {
          error: error.response.data.message,
        };
      });
  }
  getSessionData() {
    return this.auth.get("/user/profile").then((response) => {
      return response.data.user;
    });
  }
}
const Authentication = new AuthenticationActions();
export default Authentication;
