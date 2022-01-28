import React, { useState,useEffect } from 'react';
import Header from '../../components/header/Header';
import SettingEditInfoTab from '../../components/settings-tab/settings-edit-info-tab/SettingsEditInfoTab';
import SettingEditSecTab from '../../components/settings-tab/settings-edit-sec-tab/SettingsEditSecTab';
import '../settings/Settings.css';
const Settings = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    const [userData, setUserData] = useState({});
    const baseUrl = `http://localhost:5000`;
    const getSessionId = () => {
        const searchCookie = 'pastebookSessionId=';
        var cookieVal = "";
        if (document.cookie.length > 0) {
            let getCookieVal = document.cookie.indexOf(searchCookie);
            if (getCookieVal !== -1) {
                getCookieVal += searchCookie.length;
                let end = document.cookie.indexOf(";", getCookieVal);
                if (end === -1) {
                    end = document.cookie.length;
                }
                cookieVal = document.cookie.substring(getCookieVal, end);
            }
        }
        return cookieVal;
    }
    const getUserData = async () => {
        const sessionIdVal = getSessionId();
        const response = await fetch(`${baseUrl}/home`, { method: 'GET', headers: { 'X-SessionID': sessionIdVal } });
        if (response.status === 200) {
            const recUserDataVal = await response.json();
            setUserData(recUserDataVal);
        }
    }
    useEffect(() => {
        getUserData();
    }, []);
    const handleTab1 = () => {
        setActiveTab("tab1");
    }
    const handleTab2 = () => {
        setActiveTab("tab2");
    }
    return <div>
        <div className='header'>
            <Header />
        </div>
        <div className='settings-container'>
            <div className='settings'>
                <div className='nav-list'>
                    <ul className='nav'>
                        <li className={activeTab === "tab1" ? "active" : ""} onClick={handleTab1}>General</li>
                        <li className={activeTab === "tab2" ? "active" : ""} onClick={handleTab2}>Security and Login</li>
                    </ul>
                </div>
                <div className='out'>
                    {activeTab === "tab1" ? <SettingEditInfoTab userData={userData} /> : <SettingEditSecTab userData={userData} />}
                </div>
            </div>
        </div>
    </div>;
};

export default Settings;