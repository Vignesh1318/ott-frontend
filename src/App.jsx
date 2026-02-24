import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <Link to="/" className="logo">
          OTT<span>Stream</span>
        </Link>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/content/:id" element={<DetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </div>
  );
}

