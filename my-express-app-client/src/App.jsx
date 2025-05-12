import "./App.css";
import Users from "./components/Users";

const fetchpromise = fetch("http://localhost:5000/users").then((res) =>
    res.json()
  );

function App() {
  return (
    <>
      <h1>My Express.Js Application</h1>
      <Users fetchpromise={fetchpromise} />
    </>
  );
}

export default App;
