import React, {useState, useEffect, ReactNode, SyntheticEvent} from 'react';
import Navbar from '../components/Navbar';

import ApiCalendar from 'react-google-calendar-api';

const config = {
  "clientId": "175664273183-bnre5nhfnvt31c6753u8b653t748ndpb.apps.googleusercontent.com",
  "apiKey": "",
  "scope": "https://www.googleapis.com/auth/calendar",
  "discoveryDocs": [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
  ]
}

const apiCalendar = new ApiCalendar(config)

// constructor(props) {
//   super(props);
//   this.handleItemClick = this.handleItemClick.bind(this);
// };
const TestDemo = () => {
  const [events, setEvents] = useState([]);
  const [calendars, setCalendars] = useState([]);

  
  let calId = '3a9e6644a970f6843f3c67ef15a0af3ccfce9046fc544cd8f2c928b4d7a2faac@group.calendar.google.com'
  const handleItemClickSignIn = () => {
      apiCalendar.handleAuthClick()
  };

  const handleItemClickLogout = () => {
    apiCalendar.handleSignoutClick();
  }


  return (
    <div>
      <Navbar/>
      {/* <div style={{ padding: "0.5em" }}>
        <button onClick={handleItemClickSignIn()}>sign-in</button>
        <button onClick={handleItemClickLogout()}>
          sign-out
        </button>
      </div> */}
      <iframe src="https://calendar.google.com/calendar/embed?src=2d8faf6f684f51627b43c3d32dab59750dcf90e5e6796eb969a91722c304a066%40group.calendar.google.com&ctz=America%2FChicago" style={{ border: 0, width: 800, height: 600, frameborder: 0, scrolling: "no" }}></iframe>
    </div>
  );
}

export default TestDemo
