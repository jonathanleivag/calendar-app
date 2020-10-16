import "@testing-library/jest-dom";
import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { AppRouters } from "../../routers/AppRouters";
import "../../assets/style/js/fontawesome/fontawesome";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Pruebas en <AppRouter />", () => {
  test("debe de mostrar el espere...", () => {
    const initState = {
      auth: {
        checking: true,
      },
    };

    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouters />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("h5").exists()).toBe(true);
  });

  test("debe de mostrar la ruta pública", () => {
    const initState = {
      auth: {
        checking: false,
        ui: null,
      },
    };

    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouters />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".login-container").exists()).toBe(true);
  });

  test("debe de mostrar la ruta privada", () => {
    const initState = {
      calendar: {
        events: [],
      },
      ui: {
        modalOpen: false,
      },
      auth: {
        checking: false,
        uid: "123",
        name: "Johnny Leiva",
      },
    };

    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouters />
      </Provider>
    );
    expect(wrapper.find(".calendar-screen").exists()).toBe(true);
  });
});
