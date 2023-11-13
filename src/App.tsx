import { HashRouter as Router, Routes, Route } from "react-router-dom";

import AdminPage from "./components/AdminPage/AdminPage";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Lottery from "./components/Lottery/Lottery";
import UserPage from "./components/UserPage/UserPage";
import style from "./scss/App.module.scss";

const App = () => {
  return (
    <Router>
      <section className={style.App}>

        <Header />
        <Home />
        <Lottery />

        <Routes>

          <Route
            path={`/UserPage`}
            element={<UserPage />}
          />

          <Route
            path={`/AdminPage`}
            element={<AdminPage />}
          />

        </Routes>

        <Footer />

      </section>
    </Router >
  );
}

export default App;