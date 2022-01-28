import React from 'react';
import '../edit-sec/EditSec.css';

const EditSec = ({ handeleEditSecClick,userData }) => {
    return <div className='edit-email-settings'>
    <label htmlFor='edit-email'>Email:</label>
    <input type='email' name='edit-email' id='edit-emai' value={userData.Email} readOnly />
    <button onClick={(e) => handeleEditSecClick(e)}>Edit</button>
</div>;
};

export default EditSec;
