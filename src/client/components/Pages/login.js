import React, { useEffect, useContext } from "react";
import Body from "../structure/Body";
import { useNavigate } from "react-router-dom";
import Authentication from "../../store/actions/AuthenticationActions";
import { UserContext } from "../../store/context/UserContext";
import { toast } from "react-toastify";
// Don't use bootstrap for this page. Use tailwind.
function Login(props) {
  const navigate = useNavigate();
  var [formData, setFormData] = React.useState({
    username: "",
    password: "",
    rememeberMe: false,
  });

  const { sessionData, setSessionData } = useContext(UserContext);
  const [loading, setLoading] = React.useState(true);

  const handleLogin = (e) => {
    Authentication.login(formData.username, formData.password, formData.rememeberMe).then((res) => {
      // Check if there's an error.
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Logged in successfully!");
        setSessionData({
          user: res.user,
          isLoggedIn: true,
        });
        navigate(`/profile/${res.user.uniqueId}`);
      }
    });
  };

  useEffect(() => {
    if (sessionData.isLoggedIn) {
      navigate(`/profile/${sessionData.user.uniqueId}`);
    }
    setLoading(false);
  }, []);

  if (!loading) {
    return (
      <Body>
        <div className="flex flex-col items-center justify-center h-50">
          <div className="w-full max-w-xs">
            <div className="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <h1 className="text-center text-2xl font-bold">Login</h1>
              </div>
              <form className="">
                <div className="mb-4">
                  <label className="block text-white text-sm font-medium mb-2" htmlFor="username">
                    Username
                  </label>
                  <input
                    onInput={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white text-sm font-medium mb-2" htmlFor="username">
                    Password
                  </label>
                  <input
                    onInput={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="password"
                    placeholder="Username"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Sign In
                  </button>
                  {/** Remember Me? */}
                  <div className="flex items-center">
                    <input
                      onInput={(e) => setFormData({ ...formData, rememeberMe: e.target.checked })}
                      id="remember_me"
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out rounded-full"
                    />
                    <label className="ml-2 block text-sm leading-5" htmlFor="remember_me">
                      Remember me?
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* {error && <div className="text-red-500 text-center">{error}</div>} */}
      </Body>
    );
  } else {
    return <Body></Body>;
  }
}
export default Login;
