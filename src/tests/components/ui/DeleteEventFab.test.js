import "@testing-library/jest-dom";
import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { DeleteEventFab } from "../../../components/ui/DeleteEventFab";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "../../../assets/style/js/fontawesome/fontawesome";
import { eventStartDelete } from "../../../actions/events";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

jest.mock('../../../actions/events', () => ({
  eventStartDelete: jest.fn()
}))

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>
);

describe("Pruebas en <DeleteEventFab />", () => {
  test("debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Pruebas en <DeleteEventFab />", () => {
    wrapper.find("button").prop("onClick")();
    expect(eventStartDelete).toHaveBeenCalled();
  });
});
