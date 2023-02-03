import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from "./Detail.module.css"

const Detail = () => {

    const { detailId } = useParams();

    const [character, setCharacter] = useState({});

    useEffect(() => {
        // fetch(`https://rickandmortyapi.com/api/character/${detailId}`) // for real API
        fetch(`http://localhost:3001/rickandmorty/detail/${detailId}`) // integration promises (and express)
            .then((response) => response.json())
            .then((char) => {
                if (char.name) {
                    setCharacter(char);
                } else {
                    window.alert("No hay personajes con ese ID");
                }
            })
            .catch((err) => {
                window.alert("No hay personajes con ese ID");
            });
        return setCharacter({});
    }, [detailId]);

    return (
        <div className={styles.container}>
            <h1>Name: {character?.name} </h1>
            <h2>Status: {character?.status}</h2>
            <h2>Specie: {character?.species}</h2>
            <h2>Gender: {character?.gender}</h2>
            <h2>Origin: {character?.origin?.name}</h2>
            <img src={character?.image} alt={character?.name}></img>
            <Link to="/home"><button>Home</button></Link>
        </div>
    );
}

export default Detail;
