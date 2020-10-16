import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import {
  enventClearActiveEvent,
  eventStartAddNew,
  eventStartUpdate,
} from "../../actions/events";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
if (process.env.NODE_ENV !== "test") {
  Modal.setAppElement("#root");
}

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlusOne = now.clone().add(1, "hours");

const initialState = {
  title: "",
  note: "",
  start: now.toDate(),
  end: nowPlusOne.toDate(),
};

export const CalendarModal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);
  const [startDate, setStartDate] = useState(now.toDate());
  const [endtDate, setEndDate] = useState(nowPlusOne.toDate());
  const [formValues, setFormValues] = useState(initialState);

  const [titleInvalid, setTitleInvalid] = useState(true);

  const { title, note, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initialState);
    }
  }, [activeEvent, setFormValues]);

  const handlerInputChanges = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(enventClearActiveEvent());
    setFormValues(initialState);
  };

  const handlerStartDateChange = (event) => {
    setStartDate(event);
    setFormValues({ ...formValues, start: event });
  };
  const handlerEndDateChange = (event) => {
    setEndDate(event);
    setFormValues({ ...formValues, end: event });
  };

  const handlerSubmitForm = (event) => {
    event.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(end);
    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        "Error",
        "La fecha fin debe ser mayor a la fecha inicio",
        "error"
      );
    }

    if (title.trim() < 2) {
      return setTitleInvalid(false);
    }

    if (activeEvent) {
      dispatch(eventStartUpdate(formValues));
    } else {
      dispatch(eventStartAddNew(formValues));
    }

    setTitleInvalid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> {activeEvent ? "Editar evento" : "Nuevo evento"} </h1>
      <hr />
      <form className="container" onSubmit={handlerSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handlerStartDateChange}
            value={startDate}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handlerEndDateChange}
            value={endtDate}
            className="form-control"
            minDate={startDate}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleInvalid && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handlerInputChanges}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="note"
            value={note}
            onChange={handlerInputChanges}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <FontAwesomeIcon icon={["far", "save"]} />
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
