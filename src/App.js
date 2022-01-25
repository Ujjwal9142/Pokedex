import React, { useEffect, useState } from "react";
import { axiosInstance } from "./axiosInstance";
import "./App.css";
import PokeScreen from "./screens/PokeScreen";
import SinglePokemon from "./screens/SinglePokemon";
import PokeTypeScreen from "./screens/PokeTypeScreen";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Login, Logout } from "./app/actions";
import LoginScreen from "./screens/Login";
import Spinner from "react-spinkit";
import Pokedex from "./assets/pokedex.png";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      // Logged in
      if (authUser) {
        dispatch(
          Login({
            email: authUser.email,
            uid: authUser.uid,
            displayName: authUser.displayName,
            photoURL: authUser.photoURL,
          })
        );
      } else {
        dispatch(Logout());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className="appLoading">
          <div className="appLoadingContent">
            <h1>Pokédex</h1>
            <img src={Pokedex} alt="pokedex" />
            <Spinner name="ball-spin-fade-loader" color="blue" fadeIn="none" />
          </div>
        </div>
      ) : (
        <Router>
          {!user ? (
            <Routes>
              <Route path="/" element={<LoginScreen />} />
            </Routes>
          ) : (
            <>
              <Routes>
                <Route path="/" element={<PokeScreen />} />
                <Route path="/types" element={<PokeTypeScreen />} />
                <Route
                  path="/pokemon/:pokemonName"
                  element={<SinglePokemon />}
                />
              </Routes>
            </>
          )}
        </Router>
      )}
    </div>
  );
}

export default App;
