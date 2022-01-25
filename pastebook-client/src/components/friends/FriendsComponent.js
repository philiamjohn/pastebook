import React, {useState} from 'react';
import '../friends/Friends.css';
import ListTab from './ListTab';
import RequestsTab from './RequestsTab';


const Friends = () => {

    const [tab, setTab] = useState('list');

    const switchToList = () => {
        setTab(tab = 'list');
    }
    const switchToRequests = () => {
        setTab(tab = 'requests');
    }
    /* 
        constructor(props){
		super(props);
	
		this.state = {
			sessionID: props.sessionID,
			shownPage: <Menu></Menu>
		}
	}

	showMenu() {
		this.setState({
			shownPage: <Menu></Menu>
		})
	}

    <a onClick={() => { this.showMenu() } }>Dishes</a>
    */

  return (
    <div className='Friends'>
        <div className='friends-title'>
            <h3>Friends</h3>
        </div>
        <div className='friends-nav'>
            <div className='friends-nav-list'  onClick={switchToList}><p>Lists Puta</p></div>
            <div className='friends-nav-requests' onClick={switchToRequests}><p>Requests</p></div>
        </div>
        <div className='friends-content' >{tab ==='list' ? <ListTab /> : <RequestsTab />}</div>
    </div>   
  );
};

export default Friends;
