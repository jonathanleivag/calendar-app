import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { eventDeleted } from "../../actions/events";

export const DeleteEventFab = () => {
  const dispatch = useDispatch();
  const handlerDelete = () => {
    dispatch(eventDeleted());
  };
  return (
    <button className="btn btn-danger fab-danger" onClick={handlerDelete}>
      <FontAwesomeIcon icon="trash" />
      <span>Borrar elemento</span>
    </button>
  );
};
