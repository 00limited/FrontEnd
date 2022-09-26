import AdminHome from "./response/AdminHome";
import Payment1 from "./response/Payment1";
import Upload from "./response/Upload";
import Home from "./response/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import DetailFilmUser from "./response/DetailFilmUser";
import React from "react";
import { useState, useContext, useEffect } from "react";
import ProfileFx from "./response/ProfileFx";
import PaymentUser from "./response/PaymentUser";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";
import DetailFIlmAdmin from "./response/DetailFIlmAdmin";
import UpdateFilm from "./response/UpdateFilm/updateFilm";
import TvSeries from "./response/TvSeries";
import MyMovie from "./response/Movies";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  //usestate for detail and name
  const [isLoading, setIsLoading] = useState();

  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  // console.clear();
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Redirect Auth
    if (state.isLogin === false) {
      navigate("/home");
    } else {
      if (state.user.role === "admin") {
        navigate("/payment-admin");
      } else if (state.user.role === "customer") {
        navigate("/home");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log("ini reponse check auth", response);

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
    <div style={{ background: "black" }}>
      {isLoading ? (
        <>
          <h1>Loading</h1>
        </>
      ) : (
        <Routes>
          <Route path="/payment-admin" element={<Payment1 />} />
          <Route path="/filmAdmin" element={<AdminHome />} />
          <Route path="/profile-user" element={<ProfileFx />} />
          <Route path="/detailFilmAdmin/:id" element={<DetailFIlmAdmin />} />
          <Route path="/uploadfilm-admin" element={<Upload />} />
          <Route path="/payment-user" element={<PaymentUser />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movie" element={<MyMovie />} />
          <Route path="/tvseries" element={<TvSeries />} />
          <Route path="/edit-film/:id" element={<UpdateFilm />} />

          <Route path="/homeAdmin" element={<AdminHome />} />
          <Route path="/detail/:id" element={<DetailFilmUser />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
