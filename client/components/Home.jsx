import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div id='homeContainer'>
        <header>
        <h1>Welcome to the Engineer Remembrall</h1>
        </header>
        <div id="app"></div>
        <hr/>
        <img src="assets/gifs/openRB2.gif" alt="*imagine neville receiving his remembrall*"/>
        <hr/>
        <button><a href="/home">HOME</a></button>
        <button><a href="/signup">SIGNUP</a></button>
        <button><a href="/login">LOGIN</a></button>
      </div>
    )
  }
}