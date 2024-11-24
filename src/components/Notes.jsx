import React, { useEffect } from 'react'
import { NoteCard } from './NoteCard'
import { useFetch } from '../hooks/useFetch'
import { getNotes } from '../api/apiNotes'

export const Notes = () => {

  const {fn  : fnNotes , data : Notes,error : error , loading} = useFetch(getNotes)

 useEffect(()=>{
  fnNotes();
  console.log(Notes)
 },[])
 if (loading) {
  return <div>Loading...</div>;
}

  return (
    <div className='bg-orange-300 grid grid-cols-3 gap-6 mt-20 mr-20'>

    <NoteCard />
    <NoteCard />
    <NoteCard />
    <NoteCard />
    <NoteCard />
    <NoteCard />

    </div>
  )
}
