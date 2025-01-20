import { NavBar } from "./common/nav-bar";
import { Chat } from "./routes/chat";
import { Routes, Route } from "react-router";
import Homepage from "./routes/homepage";
import AuthSuccess from "./routes/auth-success";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/chat"
          element={
            <>
              <Chat />
            </>
          }
        />
        <Route path="/auth-success" element={<AuthSuccess />} />
      </Routes>
    </>
  );
}

export default App;
