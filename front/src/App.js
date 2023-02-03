import styles from '../src/App.module.css'
import Cards from './components/Cards/Cards.jsx'
import Nav from './components/Nav/Nav.jsx'
import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import About from "./components/About/About.jsx";
import Detail from "./components/Detail/Detail.jsx";
import Form from "./components/Form/Form.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import Favorites from './components/Favorites/Favorites';

function App() {

  const location = useLocation();
  const navigate = useNavigate();

  const [characters, setCharacters] = useState([]);

  const [access, setAccess] = useState(true);
  const username = 'ejemplo@gmail.com';
  const password = '1password';
  function login(userData) {
    if (userData.password === password && userData.username === username) {
      setAccess(true);
      navigate('/home');
    }
  };
  useEffect(() => {
    !access && navigate('/');
  }, [access]);

  const logOut = () => {
    setAccess(false);
    navigate("/");
  };

  const onSearch = (id) => {
    // fetch(`https://rickandmortyapi.com/api/character/${id}`) // for real API
    //fetch(`http://localhost:3001/rickandmorty/character/${id}`) // for mock-up API localhost (integration webServer)
    fetch(`http://localhost:3001/rickandmorty/character/${id}`) // (integration promises), julian me hizo cambiar el 'onsearch' or un 'character' (taba mal la ruta)
      .then((response) => response.json())
      .then((data) => {
        if (data.name) {
          setCharacters((oldChars) => [...oldChars, data]);
        } else {
          window.alert('No hay personajes con ese ID');
        }
      });
  };

  const random = (number) => {
    fetch((`https://rickandmortyapi.com/api/character/${number}`))
      .then((response) => response.json())
      .then((data) => {
        if (data.name) {
          setCharacters((oldChars) => [...oldChars, data]);
        }
      })
  }

  const onClose = (id) => {
    setCharacters(characters.filter(character =>
      character.id !== id
    ))
  }

  return (

    <div className={styles.App}>

      {
        location.pathname === "/"
          ?
          ""
          :
          <Nav
            onSearch={onSearch}
            random={random}
            logOut={logOut} />
      }

      <Routes>

        <Route
          path="/home"
          element={
            characters.length === 0
              ?
              <img src="https://image.tmdb.org/t/p/original/kCyZc7mvqHdeUGpguSGxsWPxqpI.png" alt="logo" className={styles.image} />
              :
              <Cards
                characters={characters}
                onClose={onClose} />} />

        <Route
          path="/detail/:detailId"
          element={
            <Detail />} />

        <Route
          path="/about"
          element={
            <About />} />

        <Route
          exact
          path="/"
          element={
            <Form
              login={login} />} />

        <Route
          path="/favorites"
          element={<Favorites />} />

        <Route
          path="*"
          element={<NotFound />} />


      </Routes>

    </div>

  )
}

export default App
