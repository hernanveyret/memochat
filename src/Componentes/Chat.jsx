import React, { useState, useEffect, useRef } from 'react';
import { sendMessage } from '../firebase/auth.js';
import './chat.css';

const Chat = ({ chat, setChat, setStart }) => {
  const ahora = new Date();
  const dia = `${String(ahora.getDate()).padStart(2, '0')}/${String(ahora.getMonth()+1).padStart(2, '0')}/${ahora.getFullYear()}`;
  const hora = `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}`;

  const [valorInput, setValorInput] = useState('');
  const chatRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [ userPrincipal, setUserPrincipal ] = useState('papa')

  // Detecta si el usuario scrolleó manualmente hacia arriba
  const handleScroll = () => {
    const el = chatRef.current;
    if (!el) return;
    // margen de 10px para móviles
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 10;
    setAutoScroll(isAtBottom);
  };

  // Hace scroll hacia el final solo si el usuario está abajo
  useEffect(() => {
    const el = chatRef.current;
    if (autoScroll && el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [chat, autoScroll]);

  // Observa cambios de tamaño (útil cuando aparece teclado en móviles)
  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      if (autoScroll) {
        el.scrollTop = el.scrollHeight;
      }
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, [autoScroll]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valorInput.trim()) return;

    const mensajesPrevios = chat[0]?.mensajes || [];

    sendMessage({
      id: Date.now(),
      user: "papa",
      msj: valorInput,
      dia,
      hora
    });

    setValorInput('');

    // Forzar scroll al fondo después de enviar mensaje
    setTimeout(() => {
      const el = chatRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    }, 100);
  };

  return (
    <div className="contenedor-level">
      <div className="box-level">
        <div className='box-name'>
          <p className="foto-perfil"></p>
          <p>Abi</p>
        </div>
        <div
          className="text-box"
          ref={chatRef}
          onScroll={handleScroll}
        >
          {chat.length > 0 && chat[0].mensajes?.length > 0 ? (
            chat[0].mensajes.map((msj) =>
              msj.user !== userPrincipal ? (
                <p className="abi" key={msj.id}>{msj.msj}</p>
              ) : (
                <p className="papa" key={msj.id}>{msj.msj}</p>
              )
            )
          ) : (
            <p>Cargando mensajes...</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="form-level">
          <input
            type="text"
            name="texto"
            id="sendText"
            value={valorInput}
            onChange={(e) => setValorInput(e.target.value)}
            placeholder="Escribe un mensaje..."
            autoFocus
          />
          <button type="submit" className="btn-level">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="white"
            >
              <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
            </svg>
          </button>
        </form>
      </div>

      <button
        className='btn-cerrar-level'
        onClick={() => setStart(false)}
      >
        X
      </button>
    </div>
  );
};

export default Chat;