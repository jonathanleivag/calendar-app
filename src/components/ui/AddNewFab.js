import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { enventClearActiveEvent } from "../../actions/events";
import { uiOpenModal } from "../../actions/ui";

export const AddNewFab = () => {
  const dispatch = useDispatch();
  const handlerClickNew = () => {
    dispatch(enventClearActiveEvent());
    dispatch(uiOpenModal());
  };
  return (
    <button className="btn btn-primary fab" onClick={handlerClickNew}>
      <FontAwesomeIcon icon="plus" />
    </button>
  );
};
