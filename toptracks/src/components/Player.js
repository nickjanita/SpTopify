import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useState, useEffect } from "react";
export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);
  useEffect(() => setPlay(true), [trackUri]);
  if (!accessToken) return null;

  //Builds Player component
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
      styles={{
        loaderSize: 1,
        sliderHeight: 3,
        sliderHandleBorderRadius: 4,
        sliderColor: "#1cb954",
        trackArtistColor: "#ccc",
        sliderTrackColor: "#ccc",
        trackNameColor: "#fff",
      }}
    />
  );
}
