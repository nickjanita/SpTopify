import React from "react";

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }
  //console.log(artist);
  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img src={track.art} style={{ height: "64px", width: "64px" }} />
      <div className="m-3">
        <div>{track.name}</div>
        {/* <div className="text-muted">{track.artist}</div> */}
      </div>
    </div>
  );
}
