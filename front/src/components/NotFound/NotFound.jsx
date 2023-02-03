import React from 'react';
import style from "./NotFound.module.css";

const NotFound = () => {
    return (
        <div className={style.container}>
            <h1 className={style.h1title}>404 not found!</h1>
            <img className={style.image} src="https://samdrewtakeson.com/wp-content/uploads/2020/02/rick-and-morty-1-1920x1024.jpg" alt="404 not found" />
        </div>
    );
}

export default NotFound;
