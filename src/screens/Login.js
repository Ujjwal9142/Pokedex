import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../firebase";
import "./Login.css";
import Oak from "../assets/oak.png";

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider).catch((err) => alert(err.message));
  };

  return (
    <div className="main__login">
      <img src={Oak} alt="oak" />
      <h1>
        Sign in to the <span className="first__span">Pokédex</span>
      </h1>
      <h4>
        A dummy project made by Ujjwal Jha, with help from{" "}
        <a href="https://pokeapi.co/" className="second__span" target="_blank">
          Pokéapi
        </a>
        . All content is © Nintendo, Game Freak, and The Pokémon Company.
      </h4>
      <button onClick={signIn} className="login__button">
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
