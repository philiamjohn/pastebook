import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { IoMdSettings } from 'react-icons/io';
import { FaUserAlt } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import './MenuModal.css';
import { useNavigate } from 'react-router-dom';

const MenuModal = (props) => {
    const { username } = props;
    let navigate = useNavigate();
    //Triggers after first render
    useEffect(() => {
        // Get the modal
        var menuModal = document.getElementById("menu-modal");

        // Get the button that opens the modal
        var menuButton = document.getElementById("menu-button");

        // When the user clicks the button, open the modal 
        menuButton.onclick = () => {
            menuModal.style.display = "block";
        }
    }, []);
    const baseUrl = `http://localhost:5000`;

    const logoutFunction = async () => {
        const searchCookie = "pastebookSessionId=";
        var coockieValue = "";
        if (document.cookie.length > 0) {
            console.log("hello");
            let getCookieValueTest = document.cookie.indexOf(searchCookie);
            console.log(getCookieValueTest + "hello2");
            if (getCookieValueTest != -1) {
                console.log("hello3");
                getCookieValueTest += searchCookie.length;
                console.log(getCookieValueTest + " hello4");
                let end = document.cookie.indexOf(";", getCookieValueTest)
                console.log(end + " hello5");

                if (end == -1) {
                    end = document.cookie.length;
                    console.log(end + " hello6");
                }
                coockieValue = document.cookie.substring(getCookieValueTest, end);
                console.log(coockieValue + " hello7");
            }
        }
        const response = await fetch(`${baseUrl}/session/` + coockieValue, { method: 'DELETE' });
        if (response.status === 200) {
            document.cookie = `${searchCookie}; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
            navigate("/login", { replace: true });
        }
    }
    return (
        <div id="menu-modal" className="menu-modal">
            <div className="menu-modal-content">
                <Link id="profile-link" to={`/profile/${username}`}>
                    <p>
                        <FaUserAlt
                            id="profile-icon"
                            size={15}
                            color='black' />
                        Profile
                    </p>
                </Link>
                <a href="/settings">
                    <p>
                        <IoMdSettings
                            id="settings-icon"
                            size={15}
                            color='black' />
                        Settings
                    </p>
                </a>
                <a href="#" onClick={() => logoutFunction()}>
                    <p>
                        <BiLogOut
                            id="logout-icon"
                            size={15}
                            color='black' />
                        Logout
                    </p>
                </a>
            </div>
        </div>
    );
};

export default MenuModal;
