import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import styles from "./Nav.module.css"
import { Link } from "react-router-dom";
import { resetCharacters } from "../../redux/actions";
import { useDispatch } from "react-redux";

const Nav = ({ onSearch, random, logOut }) => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(resetCharacters())
    };

    return (
        <div className={styles.nav}>
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp8729634.jpg&f=1&nofb=1&ipt=29281a4079cc29e22edf583969aa12be4b1511cd0f7ae9f26ff1b6e759addce4&ipo=images" alt="logo" width="100px"></img>
            <div className={styles.menu}>
                <Link to="/home" onClick={handleClick}><span>Home</span></Link>
                <Link to="/about"><span>About</span></Link>
                <Link to="/favorites"><span>Favs</span></Link>
                <Link to="#"><span onClick={logOut}>Bye!</span></Link>
            </div>
            <SearchBar
                onSearch={onSearch}
                random={random} />
        </div>
    );
}

export default Nav;
