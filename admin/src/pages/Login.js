import React, { useState } from "react";
import RouteMenu from "./RouteMenu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CSS from "./Login.module.css";
import { password, username } from "../credentials";

function Login() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const database = [
        {
            username,
            password
        }
    ];

    const handleSubmit = (event) => {
        event.preventDefault();

        var { uname, pass } = event.target.elements;
        const userData = database.find((user) => user.username === uname.value);

        if (userData) {
            if (userData.password !== pass.value) {
                toast.error("Incorrect credentials");
            } else {

                setIsSubmitted(true);
            }
        } else {
            toast.error("Incorrect credentials");
        }
    };

    return (
        <div>
            {isSubmitted ? <RouteMenu /> : (
                <div className={CSS['app']}>
                    <div className={CSS["form"]}>
                        <div className={CSS["title"]}>Sign In (Seller)</div>
                        <form onSubmit={handleSubmit}>
                            <div className={CSS["input-container"]}>
                                <label>Username </label>
                                <input type="text" name="uname" required placeholder="username" autoComplete="off" />
                            </div>
                            <div className={CSS["input-container"]}>
                                <label>Password </label>
                                <input type="password" name="pass" required placeholder="password" autoComplete="off" />
                            </div>
                            <div className={CSS["button-container"]}>
                                <button type="submit">Login</button>
                            </div>
                        </form>
                        <ToastContainer />
                    </div>
                </div>)
            }
        </div>
    );
}

export default Login;
