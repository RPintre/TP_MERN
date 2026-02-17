import react, { useState,useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
// Un composant React est juste une fonction qui retourne du "HTML"
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
    // if (count < 0) {
    //   const counterElement = document.getElementById("counter-value");
    //   if (counterElement) {
    //     counterElement.style.color = "red";
    //   }
    // } else {
    //   const counterElement = document.getElementById("counter-value");
    //   if (counterElement) {
    //     counterElement.style.color = "black";
    //   }
    // }
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