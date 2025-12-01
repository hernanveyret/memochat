import React, { useState, useEffect } from 'react'
import Home from './Componentes/Home';
import Chat from './Componentes/Chat';
import { getData } from './firebase/auth';
import './App.css'

function App() {
const [ chat, setChat ] = useState([])
const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    // Llamamos a getData y guardamos la función para dejar de escuchar luego
    const unsubscribe =  getData((data) => {
      setChat(data); // actualiza el estado cada vez que cambien los datos
      setLoading(false)
    });

    // Cleanup: dejar de escuchar cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  return (
    <div className="contenedor-app">
      <Home />
      <Chat 
        chat={chat}
        loading={loading}
      />
    </div>
  )
}

export default App
