import { db } from '../config/firebase'; 
import { collection, getDocs, addDoc, deleteDoc, doc,serverTimestamp, updateDoc, Timestamp } from 'firebase/firestore';


export async function getNotes() {
  const notesRef = collection(db, "notes");
  const querySnapshot = await getDocs(notesRef);


  const notes = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt ? data.createdAt.toDate().toLocaleString() : "N/A", 
    };
  });

  return notes;
}

export async function addNewNote(noteData) {
  const notesRef = collection(db, "notes"); 
  const dataWithDefaults = {
    ...noteData,
    createdAt: serverTimestamp(), 
    isPinned: false,
  };
  await addDoc(notesRef, dataWithDefaults); 
}

export async function updateNote(noteId, updatedData) {
  const noteRef = doc(db, "notes", noteId);


  if (updatedData.createdAt) {
    updatedData.createdAt = Timestamp.fromDate(new Date(updatedData.createdAt));
  }

 

  await updateDoc(noteRef, {
    ...updatedData,
    updatedAt: serverTimestamp(), 
  });
}

export async function deleteNote(noteId) {
  const noteRef = doc(db, 'notes', noteId);
  await deleteDoc(noteRef);
}
