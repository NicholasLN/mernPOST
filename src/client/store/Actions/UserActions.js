import axios from "axios";
import { toast } from "react-toastify";
function login(formData) {
  return (dispatch) => {
    /*
       if status code is 200 then login success
       else login failed. 
       in either case attach a message to the payload and dispatch the action       
    */
    axios
      .post("/api/auth/login", formData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Login Successful");
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.data,
          });
        } else {
          dispatch({
            type: "LOGIN_FAILED",
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`);
        dispatch({
          type: "LOGIN_FAILED",
          payload: error.response.data,
        });
      });
  };
}
function clearAlert() {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_ALERT",
    });
  };
}

export { login, clearAlert };
