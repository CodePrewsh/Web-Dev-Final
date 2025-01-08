import { useState } from 'react'; // Importing useState hook for managing local state
import { useDispatch } from 'react-redux'; // Importing useDispatch hook to dispatch actions
import { createNotes } from '../features/notes/notesSlice'; // Importing the createNotes action from notesSlice

function NotesForm() {
  const [text, setText] = useState(''); // Local state to manage the input text

  const dispatch = useDispatch(); // Getting the dispatch function to dispatch actions

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    dispatch(createNotes({ text })); // Dispatch the createNotes action with the text input
    setText(''); // Reset the text input field after submission
  };

  return (
    <section className='form'> {/* Section for the form */}
      <form onSubmit={onSubmit}> {/* Form with onSubmit event handler */}
        <div className='form-group'> {/* Form group for input field */}
          <label htmlFor='text'>Notes</label> {/* Label for the input field */}
          <input
            type='text' // Input type as text
            name='text' // Input name
            id='text' // Input ID
            value={text} // Binding the value to the text state
            onChange={(e) => setText(e.target.value)} // Update the text state on input change
          />
        </div>
        <div className='form-group'> {/* Form group for the submit button */}
          <button className='btn btn-block' type='submit'> {/* Button to submit the form */}
            Add Notes
          </button>
        </div>
      </form>
    </section>
  );
}

export default NotesForm; // Exporting the NotesForm component
