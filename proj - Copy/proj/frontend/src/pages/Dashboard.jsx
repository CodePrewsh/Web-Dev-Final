import { useEffect } from 'react'; // Importing useEffect hook to handle side effects
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook to navigate between routes
import { useSelector, useDispatch } from 'react-redux'; // Importing Redux hooks to access state and dispatch actions
import NotesForm from '../components/NotesForm'; // Importing NotesForm component
import NotesItem from '../components/NotesItem'; // Importing NotesItem component
import Spinner from '../components/Spinner'; // Importing Spinner component to show loading state
import { getNotes, reset } from '../features/notes/notesSlice'; // Importing actions to fetch and reset notes

function Dashboard() {
  const navigate = useNavigate(); // Hook to navigate to different routes
  const dispatch = useDispatch(); // Dispatch hook to dispatch actions

  // Selecting user and notes state from the Redux store
  const { user } = useSelector((state) => state.auth); 
  const { notes, isLoading, isError, message } = useSelector(
    (state) => state.notes
  );

  // useEffect to handle side effects (like fetching notes, handling errors, and redirecting)
  useEffect(() => {
    if (isError) {
      console.log(message); // Log error message if there's an error
    }

    if (!user) {
      navigate('/login'); // If user is not logged in, redirect to login page
    }

    dispatch(getNotes()); // Dispatch action to fetch notes from the backend

    // Cleanup function to reset notes state when component unmounts
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  // If the notes are loading, show the Spinner component
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'> {/* Section for the welcome heading */}
        <h1>Welcome {user && user.name}</h1> {/* Display user's name */}
        <p>Notes App</p>
      </section>

      <NotesForm /> {/* Render the NotesForm component for adding new notes */}

      <section className='content'> {/* Section to display the notes */}
        {notes.length > 0 ? ( // Check if there are notes to display
          <div className='notes'>
            {notes.map((notes) => (
              <NotesItem key={notes._id} notes={notes} /> // Render each note item
            ))}
          </div>
        ) : (
          <h3>You have not taken any Notes yet</h3> // Message if no notes are present
        )}
      </section>
    </>
  );
}

export default Dashboard; // Exporting the Dashboard component
