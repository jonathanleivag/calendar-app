import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { eventLogout } from "./events";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchWithoutToken("auth", { email, password }, "POST");
    const { ok, token, uid, name, msg } = await resp.json();

    if (ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid, name }));
    } else {
      Swal.fire("Error", msg, "error");
    }
  };
};

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    const resp = await fetchWithoutToken(
      "auth/new",
      { name, email, password },
      "POST"
    );
    const { ok, uid, name: name2, msg, token } = await resp.json();
    if (ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid, name: name2 }));
    } else {
      Swal.fire("Error", msg, "error");
    }
  };
};

export const starChecking = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("auth/renew");
    const { ok, uid, name, token } = await resp.json();
    if (ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid, name }));
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = (user) => ({ type: types.authLogin, payload: user });

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(eventLogout());
    dispatch(logout());
  };
};

const logout = () => ({ type: types.authLogout });
