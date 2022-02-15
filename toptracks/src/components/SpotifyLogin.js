import React from "react";
import { Container } from "react-bootstrap";
import "./login.css";
import Particles from "react-particles-js";
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=9065c82d679c48b09c2df99999c34034&response_type=code&redirect_uri=http://localhost:3000&scope=user-library-read%20user-read-email%20user-read-private%20streaming%20playlist-read-private%20user-read-playback-position%20user-library-modify%20playlist-modify-private%20user-modify-playback-state%20playlist-modify-public user-top-read%20user-read-playback-state%20ugc-image-upload";

export default function SpotifyLogin() {
  return (
    <div>
      <div id="particles" style={{ maxHeight: "100vh" }}>
        <Particles></Particles>
      </div>

      <Container
        id="container"
        className="d-flex flex-column justify-content-center align-items-center "
        style={{ minHeight: "100vh" }}
      >
        <h1 className="bg-transparent py-3">
          <strong>SpTopify</strong>
        </h1>
        <h5 className="bg-transparent py-3">
          Discover the top 50 popular tracks an Artist has on Spotify!
        </h5>
        <h6 className="bg-transparent py-3 mx-10">
          Login to Spotify below to begin
        </h6>
        <a
          id="loginButton"
          className="btn btn-outline-success btn-lg "
          href={AUTH_URL}
        >
          Login
        </a>
        <h6 className="bg-transparent py-3">
          Developed by Nick Janita using Spotify Web API
        </h6>
        <h6 className="bg-transparent py-3">
          *Mobile Web Playback is currently unsupported*
        </h6>
      </Container>
    </div>
  );
}
