import { useEffect, useReducer, useCallback } from 'react';
import reducer from '../reducers/application'
import { updateSpots } from '../helpers/helpers'
import Axios from 'axios';
const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const ws = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}`);

export const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => {
    dispatch({
      type: SET_DAY,
      day,
    });
  }

  const bookInterview = useCallback((id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    return Axios
      .put(`/api/appointments/${id}`, appointment)
  }, [state])

  const cancelInterview = useCallback((id) => Axios.delete(`/api/appointments/${id}`), [])


  const days = Axios.get(`/api/days`);
  const appointments = Axios.get(`/api/appointments`);
  const interviewers = Axios.get(`/api/interviewers`);

  useEffect(() => {
    Promise.all([days, appointments, interviewers])
      .then(response => {
        dispatch({
          type: SET_APPLICATION_DATA,
          state: {
            days: response[0].data,
            appointments: response[1].data,
            interviewers: response[2].data,
          }
        });
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    ws.onopen = () => {
      ws.send('ping');
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log("Message Received: " + event.data)
      if (data.type) {
        const appointment = {
          ...state.appointments[data.id],
          interview: data.interview,
        }
        const appointments = {
          ...state.appointments,
          [data.id]: appointment,
        }
        const dayOfWeek = state.days[Math.floor(Number(data.id) / 5)];
        dispatch({
          type: SET_INTERVIEW,
          appointments,
          days: updateSpots(data.interview ? 'create' : 'delete', dayOfWeek, state),
        });
      }
    };

    ws.onclose = () => {
      ws.close();
    }
  });

  return { state, setDay, bookInterview, cancelInterview }
}