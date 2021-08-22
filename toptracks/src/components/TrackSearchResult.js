import React from "react";
import explicit from "./explicit.png";
import "./tracks.css";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Row, Container, Col, Toast } from "react-bootstrap";

export default function TrackSearchResult({
  track,
  chooseTrack,
  playlists,
  addToPlaylist,
}) {
  //const [playlistResults, setPlaylistResults] = useState([]);
  const [show, setShow] = useState(false);
  function handlePlay() {
    chooseTrack(track);
  }
  function handleAddToPlaylist(playlist, event) {
    //console.log(event);
    addToPlaylist(track, playlist);
  }
  const PlaylistToast = () => (
    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
      <Toast.Body>Song added to Playlist</Toast.Body>
    </Toast>
  );
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title id="popover-title">Add to Playlist</Popover.Title>
      <Popover.Content>
        <div>
          <Container>
            <Row>
              {playlists.map((playlist) => (
                <div
                  id="playlist"
                  style={{ cursor: "pointer" }}
                  onClick={(event) => {
                    handleAddToPlaylist(playlist, event);
                    setShow(true);
                  }}
                >
                  {" "}
                  <img
                    src={playlist.img}
                    className="m-2"
                    id="playlist-art"
                    style={{ height: "32px", width: "32px" }}
                  />
                  <div>{playlist.name}</div>
                </div>
              ))}
            </Row>
          </Container>
        </div>
      </Popover.Content>
    </Popover>
  );

  const PlaylistPop = () => (
    <OverlayTrigger trigger="click" placement="left" overlay={popover}>
      <button type="button" className="btn">
        <FaBars />
      </button>
    </OverlayTrigger>
  );
  return (
    <div>
      <div
        className="d-flex m-2 align-items-center hover-zoom "
        id="tracks"
        style={{ cursor: "pointer" }}
        onClick={handlePlay}
      >
        {" "}
        <div className="m-2">{track.rank}</div>
        <img
          src={track.art}
          className="m-2"
          id="album-art"
          style={{ height: "64px", width: "64px" }}
        />
        <div id="trackDetails" className="m-2">
          <div>
            {track.name}{" "}
            {track.explicit ? (
              <img
                src={explicit}
                style={{ height: "16px", width: "16px" }}
              ></img>
            ) : (
              " "
            )}
          </div>
          <div className="text-muted">{track.albumName}</div>
          <div className="text-muted">{"Released: " + track.release}</div>
          {/* <div className="text-muted">{track.artist}</div> */}
        </div>
        <div id="playlist-button">
          {" "}
          <PlaylistPop />
        </div>
      </div>
      <div id="toast">
        <PlaylistToast />
      </div>
    </div>
  );
}
