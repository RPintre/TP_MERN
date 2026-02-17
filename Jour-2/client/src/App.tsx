import Home from './home.tsx'
import Library from './library.tsx'
import { Routes, Route, Link } from 'react-router-dom';




function App() {
  
  return (
<div>
<nav style={{ padding: '20px', background: '#eee' }}>
<Link to="/">Accueil</Link> | <Link to="/library">Livres</Link>
</nav>
<main style={{ padding: '20px' }}>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/library" element={<Library />} />
  <Route path="*" element={<div><h2>Erreur 404 : Page introuvable</h2><Link to="/">Retour a l'accueil</Link></div>} />
</Routes>

</main>
</div>
);
}

export default App;