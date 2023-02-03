import React, { useState } from 'react';
import style from "./Form.module.css";
import { validate } from "./validation.js";

const Form = ({ login }) => {

    const [userData, setUserData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });

    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });

        setErrors(
            validate({
                ...userData,
                [e.target.name]: e.target.value
            })
        );
    };

    if (Object.keys(errors).length === 0) {
        setErrors({
            username: "",
            password: "",
        })
    };

    const handleSubmit = () => {
        login(userData)
    };

    return (
        <div className={style.form}>

        <img className={style.logo} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp8729634.jpg&f=1&nofb=1&ipt=29281a4079cc29e22edf583969aa12be4b1511cd0f7ae9f26ff1b6e759addce4&ipo=images" alt="logo"/>

            <form onSubmit={handleSubmit}>

                <label htmlFor='username'>Username</label><br />
                <input
                    value={userData.username}
                    onChange={handleInputChange}
                    name="username"
                    className={errors.username && style.warning}
                    id="username"></input>
                <p className={style.danger}>{errors.username}</p>

                <label htmlFor='password'>Password</label><br />
                <input
                    value={userData.password}
                    onChange={handleInputChange}
                    name="password"
                    className={errors.password && style.warning}
                    id="password"></input>
                <p className={style.danger}>{errors.password}</p>

                <button type="submit">Login</button>

            </form>
        </div>
    );
}

export default Form;
