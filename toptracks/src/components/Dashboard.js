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
  const [trackResults, setTrackResults] = useState([]);
  const [playlistResults, setPlaylistResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState([]);

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
  }

  //Add song to playlist
  function addToPlaylist(track, playlist) {
    spotifyApi.addTracksToPlaylist(playlist.id, [track.uri]).then(
      function () {
        console.log("Added tracks to playlist!");
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }

  //Fetches user playlist Data
  function getPlaylists() {
    spotifyApi.getUserPlaylists().then((res) => {
      setPlaylistResults(
        res.body.items.map((playlist) => {
          let playlistImage = "";
          try {
            playlistImage = playlist.images[0].url;
          } catch (err) {
            console.log(err.message);
          }
          return {
            name: playlist.name,
            img: playlistImage,
            id: playlist.id,
          };
        })
      );
    });
  }

  //Handling artist top tracks
  function getArtistTracks(artistName) {
    setSearch("");
    spotifyApi
      .searchTracks("artist:" + artistName, { limit: 50 })
      .then((res) => {
        let songCount = 0;
        setTrackResults(
          res.body.tracks.items.map((track) => {
            songCount = songCount + 1;
            let trackImage = "";
            try {
              trackImage = track.album.images[2].url;
            } catch (err) {
              console.log(err.message);
            }
            return {
              name: track.name,
              uri: track.uri,
              art: trackImage,
              albumName: track.album.name,
              release: track.album.release_date,
              explicit: track.explicit,
              rank: songCount,
            };
          })
        );
      });
  }

  //Set access token and get playlists, only on accessToken change
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    getPlaylists();
  }, [accessToken]);

  //Artist Search, only on search or accessToken change
  useEffect(() => {
    setTrackResults([]);
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    spotifyApi.searchArtists(search).then((res) => {
      setSearchResults(
        res.body.artists.items.map((artist) => {
          let artistImage = "";
          try {
            artistImage = artist.images[0].url;
          } catch (err) {
            console.log("No image");
          }
          return {
            name: artist.name,
            artistImage: artistImage,
          };
        })
      );
    });
  }, [search, accessToken]);

  return (
    <div>
      <Container
        className="d-flex flex-column py-2"
        style={{ height: "100vh" }}
      >
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
            <TrackSearchResult
              class="tracks"
              track={track}
              chooseTrack={chooseTrack}
              playlists={playlistResults}
              addToPlaylist={addToPlaylist}
            />
          ))}
        </div>
        <div>
          <Player
            accessToken={accessToken}
            trackUri={playingTrack?.uri}
          ></Player>
        </div>
      </Container>
    </div>
  );
}
