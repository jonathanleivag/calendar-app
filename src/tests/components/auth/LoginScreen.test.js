import "@testing-library/jest-dom";
import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";
import { startLogin, startRegister } from "../../../actions/auth";
import "../../../assets/style/js/fontawesome/fontawesome";
import { LoginScreen } from "../../../components/auth/LoginScreen";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

jest.mock("../../../actions/auth", () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

describe("Pruebas en <LoginScreen />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de llamar el dispatch del login", () => {
    wrapper.find('input[name="lEmail"]').simulate("change", {
      target: {
        name: "lEmail",
        value: "johnnyleiva.jl@gmail.com",
      },
    });

    wrapper.find('input[name="lPassword"]').simulate("change", {
      target: {
        name: "lPassword",
        value: "123456",
      },
    });

    wrapper.find("form").at(0).prop("onSubmit")({ preventDefault() {} });

    expect(startLogin).toHaveBeenCalledWith(
      "johnnyleiva.jl@gmail.com",
      "123456"
    );
  });

  test("No hay registro si las contraseñas son diferentes", () => {
    wrapper.find('input[name="rEmail"]').simulate("change", {
      target: {
        name: "rEmail",
        value: "johnnyleiva.jl@gmail.cl",
      },
    });

    wrapper.find('input[name="rName"]').simulate("change", {
      target: {
        name: "rName",
        value: "johnny",
      },
    });

    wrapper.find('input[name="rPassword1"]').simulate("change", {
      target: {
        name: "rPassword1",
        value: "123456",
      },
    });

    wrapper.find('input[name="rPassword2"]').simulate("change", {
      target: {
        name: "rPassword2",
        value: "1234567",
      },
    });
    expect(startRegister).not.toHaveBeenCalled();
    wrapper.find("form").at(1).prop("onSubmit")({ preventDefault() {} });
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Las contraseñas no son iguales",
      "error"
    );
  });

  test("Registro con contraseñas iguales", () => {
    wrapper.find('input[name="rEmail"]').simulate("change", {
      target: {
        name: "rEmail",
        value: "johnnyleiva.jl@gmail.cl",
      },
    });

    wrapper.find('input[name="rName"]').simulate("change", {
      target: {
        name: "rName",
        value: "johnny",
      },
    });

    wrapper.find('input[name="rPassword1"]').simulate("change", {
      target: {
        name: "rPassword1",
        value: "123456",
      },
    });

    wrapper.find('input[name="rPassword2"]').simulate("change", {
      target: {
        name: "rPassword2",
        value: "123456",
      },
    });
    wrapper.find("form").at(1).prop("onSubmit")({ preventDefault() {} });
    expect(Swal.fire).not.toHaveBeenCalled();
    expect(startRegister).toHaveBeenCalledWith(
      "johnny",
      "johnnyleiva.jl@gmail.cl",
      "123456"
    );
  });
});
