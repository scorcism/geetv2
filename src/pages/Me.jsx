import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snacks from "../components/Snacks";

const Me = () =>{
    let navigate = useNavigate();

    const [userToken, setUserToken] = useState("");
    const [currentUser, setCurrentUser] = useState("");

    const [snackbar_, setSnackBar_] = useState({
        message: "",
        open: false
    })


    async function getData(url = "") {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": userToken
            },
        });
        let res = await response.json();
        return res;
    }

    const getCurrentUser = async () => {
        let res = await getData("auth/user")
        if (res.status == 1) {
            setCurrentUser(res.message)
        } else if (res.status == 0) {
            setSnackBar_({
                message: res.message,
                open: true
            })
        }
    }

    if (userToken) {
        getCurrentUser();
    }


    useEffect(() => {
        document.title = "Profile | GEET"
        let token = localStorage.getItem("user-token");
        if (!token) {
            navigate("/login");
        } else if (token) {
            setUserToken(token);
        }
    }, [])

    return (
        <>
        <Snacks snackbar_={snackbar_} setSnackBar_={setSnackBar_} />
            <p>
            hello world
            </p>
        
        </>
    )

}

export default Me;