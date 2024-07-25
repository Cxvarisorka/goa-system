import { useState } from "react";
import Register from "./components/Register.jsx";
import Users from "./components/Users.jsx";
import './app.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <Register loading={loading} setLoading={setLoading} />
      <Users />
    </div>
  )
}

export default App;
