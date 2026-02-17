import react, { useState,useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log("Component mounted");
    return () => {
      console.log("Component unmounted");
    };
  }, []);
  useEffect(() => {
    console.log("Component updated with count:", count);
    if (count === 34) {
      const counterElement = document.getElementById("counter-value");

      if (counterElement) {
        const p = document.createElement("p");
        p.style.color = "blue";
        p.style.fontWeight = "bold";
        p.style.fontSize = "18px";
        p.textContent = "C'est l'Hérault !";
        counterElement.parentNode?.insertBefore(p, counterElement.nextSibling);
      }
    }
    else if(count === 20) {
      const counterElement = document.getElementById("counter-value");

      if (counterElement) {
        const p = document.createElement("p");
        p.style.color = "purple";
        p.style.fontWeight = "bold";
        p.style.fontSize = "18px";
        p.textContent = "C'est bien la note que je mérite :P";
        counterElement.parentNode?.insertBefore(p, counterElement.nextSibling);
      }
    }
    else{     
      const counterElement = document.getElementById("counter-value");
      if (counterElement) {
        const nextSibling = counterElement.nextSibling;
        if (nextSibling && nextSibling.textContent === "C'est l'Hérault !") {
          nextSibling.remove();
        }
      }
    }
  }, [count]);
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  const reset = () => {
    setCount(0);
  }
  
  const prenom = "Romain";
// Cette syntaxe (HTML dans du JS), c'est du JSX, plus précisément TSX ici.
return (
<div style={{ textAlign: 'center', marginTop: '50px' }}>
<h1>🌍 Hello World !</h1>
<p> Hello {prenom}</p>
<p>Mon premier composant React fonctionne.</p>
<button onClick={increment}>Ajouter 1</button>
<button onClick={decrement}>Soustraire 1</button>
<button onClick={reset}>Reset</button>
<p id="counter-value" style={{ fontSize: '24px', fontWeight: 'bold', color: count < 0 ? "red" : count === 11 ? "green" : "black" }}>Le compteur est à : {count}</p>
</div>
);
}
export default App;