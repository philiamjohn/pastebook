import React, { useState } from 'react';
import Header from '../../components/header/Header';
import SettingEditInfoTab from '../../components/settings-tab/settings-edit-info-tab/SettingsEditInfoTab';
import SettingEditSecTab from '../../components/settings-tab/settings-edit-sec-tab/SettingsEditSecTab';
import '../settings/Settings.css';
const Settings = () => {
    const [activeTab, setActiveTab] = useState("tab1");
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
                    {activeTab === "tab1" ? <SettingEditInfoTab /> : <SettingEditSecTab />}
                </div>
            </div>
        </div>
    </div>;
};

export default Settings;