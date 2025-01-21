import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

// date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/workouts/${workout._id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error('Failed to delete workout:', error.error);
        return; // Exit if deletion failed
      }

      const json = await response.json();
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <button className="delete-button" onClick={handleClick}>
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  );
};

export default WorkoutDetails;
