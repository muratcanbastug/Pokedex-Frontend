import "./App.css";

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./providers/AuthProvider";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import NotFound from "./pages/NotFound";
import PokemonDetail from "./pages/PokemonDetail";
import CatchList from "./pages/CatchList";
import WishList from "./pages/WishList";
import UpdatePassword from "./pages/auth/UpdatePassword";
import Pokemons from "./pages/admin/Pokemons";
import Users from "./pages/admin/Users";
import UpdatePokemon from "./pages/admin/UpdatePokemon";
import SavePokemon from "./pages/admin/SavePokemon";
function App() {
  const { isLoggedIn, isAdmin } = useAuth();

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn ? (
          <Routes>
            <Route exact path="/" element={<Navigate to="/home" />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/login" element={<Navigate to="/home" />} />
            <Route exact path="/signin" element={<Navigate to="/home" />} />
            <Route path="/pokemons/*" element={<PokemonDetail />} />
            <Route exact path="/wish-list" element={<WishList />} />
            <Route exact path="/catch-list" element={<CatchList />} />
            <Route exact path="/update-password" element={<UpdatePassword />} />
            {isAdmin && (
              <>
                <Route
                  exact
                  path="/admin/user-operations"
                  element={<Users />}
                />
                <Route
                  exact
                  path="/admin/pokemon-operations"
                  element={<Pokemons />}
                />
                <Route
                  path="/admin/update-pokemon/*"
                  element={<UpdatePokemon />}
                />
                <Route
                  exact
                  path="/admin/save-pokemon"
                  element={<SavePokemon />}
                />
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
