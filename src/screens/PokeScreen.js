import React, { useEffect, useState, useRef } from "react";
import { axiosInstance } from "../axiosInstance";
import Spinner from "react-spinkit";
import "./PokeScreen.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const PokeScreen = () => {
  const [next, setNext] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [loadingElement, setLoadingElement] = useState(null);
  const stateRef = useRef();

  stateRef.current = next;

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          handleLoading();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.8,
      }
    )
  );

  useEffect(() => {
    const currentElement = loadingElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [loadingElement]);

  useEffect(() => {
    axiosInstance
      .get("pokemon?limit=20&offset=0")
      .then((res) => {
        setNext(res.data.next);
        setPokemonList(res.data.results);
      })
      .catch((err) => alert(err));
  }, []);

  const handleLoading = () => {
    if (stateRef.current) {
      setIsLoading(true);
      axios
        .get(`${stateRef.current}`)
        .then((res) => {
          setNext(res.data.next);
          setPokemonList((prevPokemonList) => [
            ...prevPokemonList,
            ...res.data.results,
          ]);
          setIsLoading(false);
        })
        .catch((err) => alert(err));
    }
  };

  const signUserOut = () => {
    signOut(auth);
  };

  return (
    <div>
      <button onClick={signUserOut} className="signout__button">
        Logout
      </button>
      <div className="main__poke__header">
        <h1>Pokédex</h1>
        <h3>
          Click any Pokémon to get its information or{" "}
          <Link to="/types" style={{ color: "#dddddd" }}>
            Search by Type
          </Link>
        </h3>
      </div>
      <div className="main__poke__container">
        {pokemonList.map((pokemon, index) => {
          return (
            <Link
              to={`/pokemon/${pokemon.name}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className={`single__poke__container ${
                  (index + 1) % 2 === 1 ? "poke__color1" : "poke__color2"
                }`}
              >
                <h2>#{index + 1}</h2>
                <h3>{pokemon.name}</h3>
              </div>
            </Link>
          );
        })}
      </div>
      <div
        className="intersection"
        ref={setLoadingElement}
        style={{ backgound: "transparent", height: "20px" }}
      >
        {isLoading ? (
          <Spinner name="ball-spin-fade-loader" color="blue" fadeIn="none" />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PokeScreen;
