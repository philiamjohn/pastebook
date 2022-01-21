import React from 'react';

const SettingEditSecTab = () => {
    return <div className='edit-pass'>
        <div className='edit-email-with-pass'>
            <input type='email' name='edit-email' id='edit-emai' value='hello@world.com' readOnly/>
            <button>Edit</button>
        </div>
        <div className='borderline'>

        </div>
        <div className='edit-pass-new-pass'>
            <input type='password' required='require' placeholder='Old Password'/>
            <input type='password' required='require' placeholder='New Password'/>
            <input type='password' required='require' placeholder='Confirm New Password'/>
            <button>Save?</button>
        </div>
    </div>;
};
export default SettingEditSecTab