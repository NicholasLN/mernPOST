// Register component
import React, { useState, useContext, useEffect } from "react";
import Body from "../structure/Body";
import Map from "./../Map";
import ReactTooltip from "react-tooltip";
import { toast } from "react-toastify";
import Authentication from "./../../store/actions/AuthenticationActions";
import { UserContext } from "./../../store/context/UserContext";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners/BeatLoader";

export default function Register(props) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    survivorName: "",
  });
  const [county, setCounty] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { sessionData, setSessionData } = useContext(UserContext);

  const handleRegister = () => {
    if (form.password == form.confirmPassword) {
      Authentication.register(form.username, form.password, form.email, form.survivorName, county.countyId).then((res) => {
        console.log(res);
        if (!res.error) {
          toast.success(res.message);
          setSessionData({
            user: res.user,
            isLoggedIn: true,
          });
          navigate(`/profile/${res.user.uniqueId}`);
        } else {
          toast.error(res.error);
        }
      });
    } else {
      toast.error("Passwords do not match");
    }
  };

  useEffect(() => {
    if (sessionData.isLoggedIn) {
      navigate(`/profile/${sessionData.user.uniqueId}`);
    } else {
      setLoading(false);
    }
  }, []);

  if (!loading) {
    return (
      <Body>
        <br />
        <div className="flex flex-wrap justify-center">
          <div className="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 my-2 mx-2">
            <div className="mb-4">
              <h1 className="text-center text-2xl font-bold">Account Details</h1>
            </div>
            <div className="">
              {/* We want the following inputs: Email, Username, Password, Confirm Password. Then another section for game details: Survivor name */}
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  onInput={(e) => {
                    setForm({ ...form, email: e.target.value });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  onInput={(e) => {
                    setForm({ ...form, username: e.target.value });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  onInput={(e) => {
                    setForm({ ...form, password: e.target.value });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                />
              </div>
              <div className="">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                  Confirm Password
                </label>
                <input
                  onInput={(e) => {
                    setForm({ ...form, confirmPassword: e.target.value });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-900 shadow-md min-w-96 rounded px-8 pt-6 pb-8 mx-2 my-2">
            <div className="mb-4">
              <h1 className="text-center text-2xl font-bold">Survivor Details</h1>
            </div>
            <div className="">
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="survivorName">
                  Survivor Name
                </label>
                <input
                  onInput={(e) => {
                    setForm({ ...form, survivorName: e.target.value });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="survivorName"
                  type="text"
                  placeholder="Survivor Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="survivorCounty">
                  County
                </label>
                <button className="bg-blue-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" data-tip data-for="mapView">
                  Select County
                </button>
                {county.countyName != undefined ? (
                  <div className="text-white text-sm font-bold mb-2">{`${county.countyName}, ${county.countyState} (${county.countyId})`}</div>
                ) : (
                  <div className="text-white text-sm font-bold mb-2">
                    Select County.
                    <br />
                    <i>Map may take a second to load.</i>
                  </div>
                )}

                <ReactTooltip id={"mapView"} backgroundColor="white" className="extraClass" delayShow={1000} delayHide={500} effect="float">
                  <Map
                    height={window.innerHeight / 2}
                    width={window.innerWidth / 2}
                    onCountyClick={(county) => {
                      setCounty({
                        countyName: county.name,
                        countyId: county.countyId,
                        countyState: county.state,
                      });
                    }}
                  />
                </ReactTooltip>
              </div>
            </div>
          </div>
        </div>
        {/* Add a button to submit the form */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              handleRegister();
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </Body>
    );
  } else {
    return <Body></Body>;
  }
}
