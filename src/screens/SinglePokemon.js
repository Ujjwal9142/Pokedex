import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../axiosInstance";
import "./SinglePokemon.css";

const SinglePokemon = () => {
  const params = useParams();

  const [pokePic, setPokePic] = useState("");
  const [shinyPokePic, setShinyPokePic] = useState("");
  const [stats, setStats] = useState([]);
  const [types, setTypes] = useState([]);
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [moves, setMoves] = useState([]);
  const [id, setId] = useState();

  useEffect(() => {
    axiosInstance
      .get(`/pokemon/${params.pokemonName}`)
      .then((res) => {
        setHeight(res.data.height);
        setWeight(res.data.weight);
        setId(res.data.id);
        setPokePic(res.data.sprites.front_default);
        setShinyPokePic(res.data.sprites.front_shiny);
        setTypes(res.data.types.map((type) => type.type.name));
        setMoves(res.data.moves.map((move) => move.move.name));
        setStats(
          res.data.stats.map((stat) => ({
            value: stat.base_stat,
            name: stat.stat.name,
          }))
        );
      })
      .catch((err) => alert(err));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="single__screen__main">
      <button onClick={() => window.history.back()} className="back__button">
        Back
      </button>
      <h1>{params.pokemonName}</h1>
      <div className="single__screen__images">
        <div className="single__screen__image">
          <img src={pokePic} alt={params.pokemonName} />
          <h2>Regular variant</h2>
        </div>
        <div className="single__screen__image">
          <img src={shinyPokePic} alt={params.pokemonName} />
          <h2>Shiny variant</h2>
        </div>
      </div>

      <div className="single__screen__stats__main">
        <table id="pokeTable">
          <tr>
            <th>Pokédex Id:</th>
            <td>#{id}</td>
          </tr>
          <tr>
            <th>Height:</th>
            <td>{height / 10} m</td>
          </tr>
          <tr>
            <th>Weight:</th>
            <td>{weight / 10} kg</td>
          </tr>
          <tr>
            <th>Type(s):</th>
            <td>
              {types?.map((type, index) => {
                return (
                  <span>
                    {type}
                    {index === types?.length - 1 ? "" : ", "}
                  </span>
                );
              })}
            </td>
          </tr>
          <tr>
            <th>{stats[0]?.name}:</th>
            <td>{stats[0]?.value}</td>
          </tr>
          <tr>
            <th>{stats[1]?.name}:</th>
            <td>{stats[1]?.value}</td>
          </tr>
          <tr>
            <th>{stats[2]?.name}:</th>
            <td>{stats[2]?.value}</td>
          </tr>
          <tr>
            <th>{stats[3]?.name}:</th>
            <td>{stats[3]?.value}</td>
          </tr>
          <tr>
            <th>{stats[4]?.name}:</th>
            <td>{stats[4]?.value}</td>
          </tr>
          <tr>
            <th>{stats[5]?.name}:</th>
            <td>{stats[5]?.value}</td>
          </tr>
          <tr>
            <th>Moves:</th>
            <td id="pokeMoves">
              {moves[0]}
              {", "}
              {moves[1]}
              {", "}
              {moves[2]}
              {", "}
              {moves[3]}
              {", "}
              {moves[4]}
              {", "}
              {moves[5]}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default SinglePokemon;
