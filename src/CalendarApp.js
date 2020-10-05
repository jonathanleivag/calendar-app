import React from "react";
import { AppRouters } from "./routers/AppRouters";
// style
import "./assets/style/index";
import { Provider } from "react-redux";
import { store } from "./store/store";

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <AppRouters />
    </Provider>
  );
};
