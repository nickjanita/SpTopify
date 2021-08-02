import React from "react";

export default function ArtistSearchResult({ artist, getArtistTracks }) {
  function handleClick() {
    getArtistTracks(artist.name);
  }
  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      <img src={artist.artistUrl} style={{ height: "64px", width: "64px" }} />
      <div className="m-3">
        <div>{artist.name}</div>
        {/* <div className="text-muted">{track.artist}</div> */}
      </div>
    </div>
  );
}
