import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SpotifyLogin from "./components/SpotifyLogin";
import Dashboard from "./components/Dashboard";
const code = new URLSearchParams(window.location.search).get("code");
function App() {
  return code ? <Dashboard code={code} /> : <SpotifyLogin />;
}

export default App;
