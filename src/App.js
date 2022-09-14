import React, { useState } from 'react'
import './App.css'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';


const App = () => {
  const [userData,setUserData] = useState({});
  const [input,setInput] = useState('');
  const [searched,setSearched] = useState(false)

  const getData = () => {
    fetch(`https://api.github.com/users/${input}`)
    .then(response => response.json())
    .then(data => setUserData(data))
    setSearched(true)
  }

  console.log(userData)

  return (
    <div className="app">
      <div className="info-wrapper">
        <div className="search-container">
          <TextField
            variant="filled"
            type="text"
            label="Github Username"
            placeholder="Type Github Username"
            fullWidth
            InputLabelProps={{ style: { color: "whitesmoke" } }}
            InputProps={{ style: { color: "whitesmoke", fontSize: 15 } }}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="contained"
            className="search-btn"
            color="primary"
            onClick={getData}
          >
            Search
          </Button>
        </div>

        {searched === true && userData.message !== 'Not Found'? (
          <div className="about-user-container">
            <div className="about-wrapper">
              <div className="image-container">
                <img src={userData?.avatar_url} alt="userimage" className='avatar-url'/>
              </div>
              <div className="info-container">
                <div className="details-container">
                  <div className="name-container">
                    <div>
                      <h3 className="user__name">{userData?.login}</h3>
                      <p className='tag'>@{userData?.login}</p>
                      <p className='bio'>{userData?.bio === null ? 'Bio Not Found':userData?.bio}</p>
                    </div>
                    <p className="join-date">
                      Joined{" "}
                      {userData?.created_at?.slice(0, 10).replace(/-/g, "/")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-followers">
              <div className='followers-box'>
                <div className='repository-container'>
                  <h3 className='rep-text'>Repository</h3>
                  <p className='quantity'>{userData?.public_repos}</p>
                </div>

                <div className='repository-container'>
                  <h3 className='rep-text'>Followers</h3>
                  <p className='quantity'>{userData?.followers}</p>
                </div>

                <div className='repository-container'>
                  <h3 className='rep-text'>Following</h3>
                  <p className='quantity'>{userData?.following}</p>
                </div>
              </div>
            </div>
          </div>
        ) : userData.message === 'Not Found'?(
          <div className='error-container'>
          <p className='error-text'>User Not Found</p>
          <img className='error-icon' src='/images/404.png' alt='error image' />
        </div>
        ):
        <p className='first-text'>You can search GitHub users in this app. Just type the username and get the result.</p>
        }
      </div>
    </div>
  );
}

export default App
