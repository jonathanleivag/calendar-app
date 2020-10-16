import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";
import { startLogin, startRegister, starChecking } from "../../actions/auth";
import * as fun from "../../helpers/fetch";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState);

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

Storage.prototype.setItem = jest.fn();

describe("Pruebas en las acciones Auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("startLogin correcto", async () => {
    await store.dispatch(startLogin("johnnyleiva.jl@gmail.com", "123456"));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: { uid: expect.any(String), name: expect.any(String) },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );

    // console.log(localStorage.setItem.mock.calls[0][1]);
  });

  test("startLogin incorrecto", async () => {
    await store.dispatch(startLogin("johnnyleiva.jl@gmail.com", "1234566"));
    const actions = store.getActions();
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Error en la autenticación",
      "error"
    );
  });

  test("startRegister correcto", async () => {
    fun.fetchWithoutToken = jest.fn(() => ({
      json() {
        return { ok: true, uid: "123", name: "johnny", token: "1234" };
      },
    }));
    await store.dispatch(startRegister("test", "test@test.test", "123456"));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: { uid: "123", name: "johnny" },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "1234");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("startChecking correcto", async () => {
    fun.fetchWithToken = jest.fn(() => ({
      json() {
        return { ok: true, uid: "123", name: "johnny", token: "1234" };
      },
    }));

    await store.dispatch(starChecking());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: { uid: "123", name: "johnny" },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith("token", "1234");
  });
});
