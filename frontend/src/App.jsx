import { useState } from "react";
import Dashboard from "./dashboard";
import Layout from './layout';
import Tickets from "./tickets";


function App() {
  const [selected, setSelected] = useState("dashboard");

  return (
    <Layout selected={selected} setSelected={setSelected}>
      {selected === "dashboard" && <Dashboard />}
      {selected === "tickets" && <Tickets />}
    </Layout>
  );
}

export default App;
