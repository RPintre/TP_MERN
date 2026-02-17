import { useState,useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom';

const Home = () =>{
    const [count, setCount] = useState(0);
  const [darkmode,setDark]= useState(0);
  const setDarkMode = () =>{
    if(darkmode==0){
      setDark(1);

    }else{
      setDark(0);
    }
  }
  
  useEffect(() => {
    console.log("Component mounted");
    return () => {
      console.log("Component unmounted");
    };
  }, []);
  useEffect(() => {
    const container = document.getElementById("container");
    const button = document.getElementById("dark-mode_btn");
    if(darkmode==0){
      if(container){
        container.style.backgroundColor="#FFFFFF";
        container.style.color = "black";
      }
      if(button){
        button.innerText="Dark mode 🌙";
      }
    }
    else{
      if(container){
        container.style.backgroundColor="black";
        container.style.color = "white";
      }
      if(button){
        button.innerText="☀️ mode clair";
      }
    }
  }, [darkmode]);
  useEffect(() => {
    console.log("Component updated with count:", count);
    
  }, [count]);
  const increment = () => {
    setCount(count => count + 1);
  };
  const decrement = () => {
    setCount(count => count - 1);
  };
  const reset = () => {
    setCount(0);
  }
  
  const prenom = "Romain";
  return (
  <div
  id="container"
  style={{
    textAlign: "center",
    marginTop: "50px",
    backgroundColor: darkmode ? "black" : "white",
    color: darkmode ? "white" : "black",
  }}
  >
  <h1>🌍 Hello World !</h1>
  <button onClick={setDarkMode}>
    {darkmode ? "☀️ mode clair" : "Dark mode 🌙"}
  </button>

  <p> Hello {prenom}</p>
  <p>Mon premier composant React fonctionne.</p>
  <button onClick={increment}>Ajouter 1</button>
  <button onClick={decrement}>Soustraire 1</button>
  <button onClick={reset}>Reset</button>
  <p id="counter-value" style={{ fontSize: '24px', fontWeight: 'bold', color: count < 0 ? "red" : count === 11 ? "green" : darkmode== 0 ? "black" : darkmode==1 ? "white" : "black"}}>Le compteur est à : {count}</p>
    {count === 34 && (
      <p className="text-ajout" style={{ color: "blue", fontWeight: "bold", fontSize: "18px" }}>
      C'est l'Hérault !
    </p>
  )}

  {count === 20 && (
    <p className="text-ajout" style={{ color: "purple", fontWeight: "bold", fontSize: "18px" }}>
      C'est bien la note que je mérite :P
    </p>
  )}
  </div>

  );
}

const Library = () => <h2>Ma Bibliothèque</h2>;

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
  <Route path="*" element={<h2>Erreur 404 : Page introuvable</h2>} />
</Routes>

</main>
</div>
);
}

export default App;