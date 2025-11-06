import { GoogleAuthProvider } from "firebase/auth";
import { collection,
         onSnapshot, 
         addDoc,
         deleteDoc,
         doc, 
         setDoc,
         updateDoc, 
         getDocs,
         arrayUnion, 
         arrayRemove,
        } from "firebase/firestore";

import { auth, db } from "./config.js";
const provider = new GoogleAuthProvider();

const chatDocId = "chat_unico"; 

export const sendMessage = async (message) => {
  console.log('Enviando un mensaje...');
  try {
    const chatRef = doc(db, "chat", "XRwLVNAFrFWLnsT3kg4W");
    // Agregamos el mensaje al array "mensajes"
    await updateDoc(chatRef, {
      mensajes: arrayUnion(message)
    });

    //console.log("Mensaje guardado correctamente!");
  } catch (error) {
    console.error("⛔ Error al guardar el mensaje:", error);
  }
};

// Escuchar cambios en tiempo real y descargarlos
export const getData = (callback) => {
  try {
    const unsubscribe = onSnapshot(collection(db,'chat'), snapshot => {
      const usuarios = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    console.log('Usuarios', usuarios)
    callback(usuarios);
  })
  return unsubscribe;
  } catch (error) {
    callback([]);
  }
};