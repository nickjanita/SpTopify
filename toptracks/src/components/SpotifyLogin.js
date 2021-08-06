import React from "react";
import { Container } from "react-bootstrap";
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=9065c82d679c48b09c2df99999c34034&response_type=code&redirect_uri=http://localhost:3000&scope=user-library-read%20user-read-email%20user-read-private%20streaming%20playlist-read-private%20user-read-playback-position%20user-library-modify%20playlist-modify-private%20user-modify-playback-state%20playlist-modify-public user-top-read%20user-read-playback-state%20ugc-image-upload";

export default function SpotifyLogin() {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <h1 className="py-3">SpTopify</h1>
      <h5 className="py-3">
        Discover the top 50 popular tracks an Artist has on Spotify!
      </h5>
      <h6 className="py-3">Login to Spotify below to begin</h6>
      <a className="btn btn-success btn-lg " href={AUTH_URL}>
        Login
      </a>
      <h7 className="py-3">Developed by Nick Janita using Spotify Web API</h7>
    </Container>
  );
}
