import { useDispatch } from 'react-redux'; // Importing useDispatch hook to dispatch actions
import { deleteNotes } from '../features/notes/notesSlice'; // Importing the deleteNotes action from notesSlice

function NotesItem({ notes }) {
  const dispatch = useDispatch(); // Getting the dispatch function to dispatch actions

  return (
    <div className='notes'> {/* Container for a single note */}
      <div>{new Date(notes.createdAt).toLocaleString('en-US')}</div> {/* Display the note's creation date in a readable format */}
      <h2>{notes.text}</h2> {/* Display the note's text */}
      <button 
        onClick={() => dispatch(deleteNotes(notes._id))} // Dispatch the deleteNotes action with the note's ID when the button is clicked
        className='close' // Button class for styling
      >
        X {/* Button text to indicate delete */}
      </button>
    </div>
  );
}

export default NotesItem; // Exporting the NotesItem component
