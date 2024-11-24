import { db } from '../config/firebase'; 
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';


export async function getNotes() {
  const notesRef = collection(db, 'notes');
  const querySnapshot = await getDocs(notesRef);
  const notes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return notes;
}


export async function addNewNote(noteData) {
  const notesRef = collection(db, 'notes');
  await addDoc(notesRef, noteData);
}


export async function deleteNote(noteId) {
  const noteRef = doc(db, 'notes', noteId);
  await deleteDoc(noteRef);
}
