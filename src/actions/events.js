import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvent";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    const res = await fetchWithToken("events", event, "POST");
    const {
      ok,
      event: { id },
    } = await res.json();
    try {
      if (ok) {
        event.id = id;
        event.user = { _id: uid, name };
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const enventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
});

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(`events/${event.id}`, event, "PUT");
      const { ok, msg } = await resp.json();

      if (ok) {
        dispatch(eventUpdated(event));
      } else {
        Swal.fire("error", msg, "error");
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent;
    try {
      const resp = await fetchWithToken(`events/${id}`, {}, "DELETE");
      const { ok, msg } = await resp.json();

      if (ok) {
        dispatch(eventDeleted());
      } else {
        Swal.fire("error", msg, "error");
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const eventDeleted = () => ({
  type: types.eventDeleted,
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const res = await fetchWithToken("events");
      const { ok, events } = await res.json();

      if (ok) {
        const eventsPrepare = prepareEvents(events);
        dispatch(eventLoaded(eventsPrepare));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const eventLoaded = (events) => ({ type: types.eventLoaded, payload: events });

export const eventLogout = () => ({ type: types.eventLogout });
