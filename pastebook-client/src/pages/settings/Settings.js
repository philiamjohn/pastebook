import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import SettingEditInfoTab from '../../components/settings-tab/settings-edit-info-tab/SettingsEditInfoTab';
import SettingEditSecTab from '../../components/settings-tab/settings-edit-sec-tab/SettingsEditSecTab';
import '../settings/Settings.css';
const Settings = ({ getSessionIdFromCookie, getUserData, userData, baseUrl }) => {
    const [activeTab, setActiveTab] = useState("tab1");
    useEffect(() => {
        for (let id = 0; id <= 1000; id++) {
            window.clearInterval(id);
        }
        getUserData();
        getSessionIdFromCookie();
    }, []);
    const handleTab1 = () => {
        setActiveTab("tab1");

    }
    const handleTab2 = () => {
        setActiveTab("tab2");
    }
    const username = localStorage.getItem('profileUsername');
    return <div>
        <div className='header'>
            <Header username={userData.UserName} getSessionIdFromCookie={getSessionIdFromCookie} />
        </div>
        <div className='settings-container'>
            <div className='settings'>
                <div className='nav-list'>
                    <ul className='nav'>
                        {/* tab navigation */}
                        <li className={activeTab === "tab1" ? "active" : ""} onClick={handleTab1}>General</li>
                        <li className={activeTab === "tab2" ? "active" : ""} onClick={handleTab2}>Security and Login</li>
                    </ul>
                </div>
                {/* tabs */}
                <div className='out'>
                    {activeTab === "tab1" ? <SettingEditInfoTab userData={userData} /> : <SettingEditSecTab userData={userData} getSessionIdFromCookie={getSessionIdFromCookie} baseUrl={baseUrl}/>}
                </div>
            </div>
        </div>
    </div>;
};

export default Settings;