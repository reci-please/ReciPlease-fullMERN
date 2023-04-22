import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Auth } from './pages/auth';
import { CreateRecipe } from './pages/create-recipe';
import { SavedRecipes } from './pages/saved-recipes';
import { Search } from './pages/search';
import { SearchMulti } from './pages/search-multi';
import { Navbar } from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/saved-recipes" element={<SavedRecipes />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search_multi" element={<SearchMulti />} />
      </Routes>
    </Router> </div>
  );
}

export default App;
