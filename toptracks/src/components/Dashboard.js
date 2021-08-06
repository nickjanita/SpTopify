import React from "react";
import useAuth from "./useAuth";
import { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import ArtistSearchResult from "./ArtistSearchResult";
import Player from "./Player";

const spotifyApi = new SpotifyWebApi({
  client_id: "9065c82d679c48b09c2df99999c34034",
});
export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [albumResults, setAlbumResults] = useState([]);
  const [trackResults, setTrackResults] = useState([]);
  // console.log(searchResults);
  // console.log(albumResults);
  const [playingTrack, setPlayingTrack] = useState([]);
  //console.log(searchResults);

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
  }

  function getArtistTracks(artistName) {
    setSearch("");
    spotifyApi
      .searchTracks("artist:" + artistName, { limit: 50 })
      .then((res) => {
        setTrackResults(
          res.body.tracks.items.map((track) => {
            var trackImage = "";
            //console.log(track);
            try {
              trackImage = track.album.images[2].url;
            } catch (err) {
              console.log(err.message);
            }
            return {
              name: track.name,
              uri: track.uri,
              art: trackImage,
            };
          })
        );
      });
  }
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    setTrackResults([]);
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    (async () => {
      let res = await spotifyApi.searchArtists(search);
      //console.log(res.body);
      setSearchResults(
        res.body.artists.items.map((artist) => {
          //console.log(artist);
          // if (typeof artist.image != "undefined") {
          //   var artistImage = artist.images[0].url;
          //   console.log(artistImage);
          // }
          var artistImage = "";
          try {
            artistImage = artist.images[0].url;
          } catch (err) {
            console.log("No image");
          }
          //console.log(artist);
          return {
            name: artist.name,
            // title: track.name,
            id: artist.id,
            artistUrl: artistImage,
          };
        })
      );
    })();
    //return () => (cancel = true);
  }, [search, accessToken]);
  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></Form.Control>
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map((artist) => (
          <ArtistSearchResult
            artist={artist}
            getArtistTracks={getArtistTracks}
          />
        ))}
        {trackResults.map((track) => (
          <TrackSearchResult track={track} chooseTrack={chooseTrack} />
        ))}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri}></Player>
      </div>
    </Container>
  );
}
