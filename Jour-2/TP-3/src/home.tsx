import { useState,useEffect } from 'react'
 const Home = () =>{
  const init = Number(localStorage.getItem("monCompteur")) ?? 0;
  const [count, setCount] = useState(init);
  useEffect(() => {
    console.log("Component mounted");
    return () => {
      console.log("Component unmounted");
    };
  }, []);
  useEffect(() => {
    console.log("Component updated with count:", count);
    localStorage.setItem('monCompteur', count.toString());
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
  const [darkmode,setDark]= useState(0);
  const setDarkMode = () =>{
    if(darkmode==0){
      setDark(1);
    }else{
      setDark(0);
    }
  } 
  useEffect(() => {
    
  }, [darkmode]);
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

export default Home;