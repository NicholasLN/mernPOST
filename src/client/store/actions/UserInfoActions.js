import axios from "axios";

class UserInfoActions {
  constructor() {
    this.auth = axios.create({
      baseURL: "/api",
      withCredentials: true,
    });
  }
  getNavBarData() {
    return this.auth.get("/user/navBarLinks").then((response) => {
      return response.data;
    });
  }
}
const UserInfo = new UserInfoActions();
export default UserInfo;
