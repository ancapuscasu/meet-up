import React from "react";
import './WelcomeScreen.css';
function WelcomeScreen(props) {
  return props.showWelcomeScreen ?
    (
      <div className="WelcomeScreen">
        <h1 className="WelcomeScreen__title">Welcome to <span className="meet-up-brand">meet app</span></h1>
        <div className="WelcomeScreen__message">
          <h4> Log in to see upcoming events around the world for full-stack developers </h4>
          <button type="button" class="google-login-btn" >
            Sign in with Google
          </button>
        </div>
     
        <a
          className="WelcomeScreen__privacy"
          href="https://ancapuscasu.github.io/meet-up/privacy.html"
          rel="nofollow noopener"
        > 
          Privacy policy
        </a>
      </div> 
    )
  : null }

export default WelcomeScreen;