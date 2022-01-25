import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axiosInstance";
import RightArrow from "../assets/right.png";
import "./PokeTypeScreen.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RemoveType, SelectType } from "../app/actions";

const PokeTypeScreen = () => {
  const user = useSelector((state) => state.user.user);
  const type = useSelector((state) => state.type.type);
  const dispatch = useDispatch();
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    if (type) {
      axiosInstance
        .get(`/type/${type.id}`)
        .then((res) => setPokemons(res.data.pokemon))
        .catch((err) => alert(err));
      setSelectedType(type.type);
    }
  }, [type]);

  const handleTypeClick = (id) => {
    axiosInstance
      .get(`/type/${id}`)
      .then((res) => setPokemons(res.data.pokemon))
      .catch((err) => alert(err));

    if (id === 1) {
      setSelectedType("Normal");
      dispatch(
        SelectType({
          type: "Normal",
          id: "1",
        })
      );
    } else if (id === 2) {
      setSelectedType("Fighting");
      dispatch(
        SelectType({
          type: "Fighting",
          id: "2",
        })
      );
    } else if (id === 3) {
      setSelectedType("Flying");
      dispatch(
        SelectType({
          type: "Flying",
          id: "3",
        })
      );
    } else if (id === 4) {
      setSelectedType("Poison");
      dispatch(
        SelectType({
          type: "Poison",
          id: "4",
        })
      );
    } else if (id === 5) {
      setSelectedType("Ground");
      dispatch(
        SelectType({
          type: "Ground",
          id: "5",
        })
      );
    } else if (id === 6) {
      setSelectedType("Rock");
      dispatch(
        SelectType({
          type: "Rock",
          id: "6",
        })
      );
    } else if (id === 7) {
      setSelectedType("Bug");
      dispatch(
        SelectType({
          type: "Bug",
          id: "7",
        })
      );
    } else if (id === 8) {
      setSelectedType("Ghost");
      dispatch(
        SelectType({
          type: "Ghost",
          id: "8",
        })
      );
    } else if (id === 9) {
      setSelectedType("Steel");
      dispatch(
        SelectType({
          type: "Steel",
          id: "9",
        })
      );
    } else if (id === 10) {
      setSelectedType("Fire");
      dispatch(
        SelectType({
          type: "Fire",
          id: "10",
        })
      );
    } else if (id === 11) {
      setSelectedType("Water");
      dispatch(
        SelectType({
          type: "Water",
          id: "11",
        })
      );
    } else if (id === 12) {
      setSelectedType("Grass");
      dispatch(
        SelectType({
          type: "Grass",
          id: "12",
        })
      );
    } else if (id === 13) {
      setSelectedType("Electric");
      dispatch(
        SelectType({
          type: "Electric",
          id: "13",
        })
      );
    } else if (id === 14) {
      setSelectedType("Psychic");
      dispatch(
        SelectType({
          type: "Psychic",
          id: "14",
        })
      );
    } else if (id === 15) {
      setSelectedType("Ice");
      dispatch(
        SelectType({
          type: "Ice",
          id: "15",
        })
      );
    } else if (id === 16) {
      setSelectedType("Dragon");
      dispatch(
        SelectType({
          type: "Dragon",
          id: "16",
        })
      );
    } else if (id === 17) {
      setSelectedType("Dark");
      dispatch(
        SelectType({
          type: "Dark",
          id: "17",
        })
      );
    } else if (id === 18) {
      setSelectedType("Fairy");
      dispatch(
        SelectType({
          type: "Fairy",
          id: "18",
        })
      );
    }
  };

  const handleBackClick = () => {
    dispatch(RemoveType());
    window.history.back();
  };

  return (
    <div className="poketype__screen">
      <button onClick={handleBackClick} className="back__button">
        Back
      </button>
      <h1>Hello {user.name}, choose any Pokémon type!</h1>
      <div className="poketype__screen__header">
        <button onClick={() => handleTypeClick(1)} className="poke__Normal">
          Normal
        </button>
        <button onClick={() => handleTypeClick(2)} className="poke__Fighting">
          Fighting
        </button>
        <button onClick={() => handleTypeClick(3)} className="poke__Flying">
          Flying
        </button>
        <button onClick={() => handleTypeClick(4)} className="poke__Poison">
          Poison
        </button>
        <button onClick={() => handleTypeClick(5)} className="poke__Ground">
          Ground
        </button>
        <button onClick={() => handleTypeClick(6)} className="poke__Rock">
          Rock
        </button>
        <button onClick={() => handleTypeClick(7)} className="poke__Bug">
          Bug
        </button>
        <button onClick={() => handleTypeClick(8)} className="poke__Ghost">
          Ghost
        </button>
        <button onClick={() => handleTypeClick(9)} className="poke__Steel">
          Steel
        </button>
        <button onClick={() => handleTypeClick(10)} className="poke__Fire">
          Fire
        </button>
        <button onClick={() => handleTypeClick(11)} className="poke__Water">
          Water
        </button>
        <button onClick={() => handleTypeClick(12)} className="poke__Grass">
          Grass
        </button>
        <button onClick={() => handleTypeClick(13)} className="poke__Electric">
          Electric
        </button>
        <button onClick={() => handleTypeClick(14)} className="poke__Psychic">
          Psychic
        </button>
        <button onClick={() => handleTypeClick(15)} className="poke__Ice">
          Ice
        </button>
        <button onClick={() => handleTypeClick(16)} className="poke__Dragon">
          Dragon
        </button>
        <button onClick={() => handleTypeClick(17)} className="poke__Dark">
          Dark
        </button>
        <button onClick={() => handleTypeClick(18)} className="poke__Fairy">
          Fairy
        </button>
      </div>

      <div className="poketype__screen__body">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="poketype__screen__search"
        />
        <div className="poketype__screen__list">
          {selectedType === "" ? (
            <h1>No type selected!</h1>
          ) : (
            <h1>Results for {selectedType}:</h1>
          )}
          {pokemons?.map((pokemon) => {
            if (
              pokemon.pokemon.name
                .toString()
                .toLowerCase()
                .includes(searchQuery.toString().toLowerCase())
            ) {
              return (
                <Link
                  to={`/pokemon/${pokemon.pokemon.name}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className={`poketype__screen__units ${selectedType}`}>
                    <h2>{pokemon.pokemon.name}</h2>
                    <img src={RightArrow} alt="RightArrow" />
                  </div>
                </Link>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default PokeTypeScreen;
