import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import Error from "components/Appointment/Error"
import { useVisualMode } from "hooks/useVisualMode"
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_NO_INTERVIEWER = "ERROR_NO_INTERVIEWER"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    if (interviewer === undefined) {
      transition(ERROR_NO_INTERVIEWER, true);
    } else {
      const interview = {
        student: name,
        interviewer
      }

      transition(SAVING)
      props.bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch(err => transition(ERROR_SAVE, true))

    }
  }

  function confirmDeletion() {
    transition(DELETING, true)
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true))
  }

  function deletion(name, interviewer) {
    transition(CONFIRM)
  }

  function edit() {
    transition(EDIT)
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY &&
        (<Empty
          onAdd={() => transition(CREATE)}
          data-testid="appointment"
        />)
      }
      {mode === CREATE &&
        (<Form
          interviewers={props.interviewers}
          placeholder="/enter student name/"
          onCancel={() => back()}
          onSave={save}
          data-testid="appointment"
        />)
      }
      {mode === SHOW && props.interview &&
        (<Show
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer}
          onDelete={deletion}
          onEdit={edit}
          data-testid="appointment"
        />)
      }
      {mode === EDIT &&
        (<Form
          interviewers={props.interviewers}
          interviewer={props.interview && props.interview.interviewer.id}
          student={props.interview.student}
          name={props.interview && props.interview.student}
          onCancel={() => back()}
          onSave={save}
          data-testid="appointment"
        />)
      }
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would to like to delete?"
          onCancel={() => back()}
          onConfirm={confirmDeletion}
          data-testid="appointment"
        />
      )}
      {mode === SAVING && (
        <Status
          message="SAVING"
          data-testid="appointment"
        />
      )}
      {mode === DELETING && (
        <Status
          message="DELETING"
          data-testid="appointment"
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not delete appointment"
          onClose={back}
          data-testid="appointment"
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment"
          onClose={back}
          data-testid="appointment"
        />
      )}
      {mode === ERROR_NO_INTERVIEWER && (
        <Error
          message="Please select an interviewer"
          onClose={back}
          data-testid="appointment"
        />
      )}
    </article>
  )
};


