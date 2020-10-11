import React, { useEffect, useState } from "react";
import { NavBar } from "../ui/NavBar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import { Container } from "react-bootstrap";
import { messages } from "../../helpers/calendar-messages-es";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import {
  enventClearActiveEvent,
  eventSetActive,
  eventStartLoading,
} from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

const localizer = momentLocalizer(moment);
export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  moment.locale("es");

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);

  const onDoubleClickEvent = (event) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (event) => {
    dispatch(eventSetActive(event));
  };

  const onView = (event) => {
    setLastView(event);
    localStorage.setItem("lastView", event);
  };

  const eventPropGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: uid === event.user._id ? "#367cf7" : "#465660",
      borderRadius: 0,
      opacity: 0.8,
      display: "block",
    };

    return { style };
  };

  const onSelectSlot = (event) => {
    dispatch(enventClearActiveEvent());
  };

  return (
    <div>
      <NavBar />
      <Container className="mt-3">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          messages={messages}
          eventPropGetter={eventPropGetter}
          components={{ event: CalendarEvent }}
          onDoubleClickEvent={onDoubleClickEvent}
          onSelectEvent={onSelectEvent}
          onView={onView}
          view={lastView}
          selectable={true}
          onSelectSlot={onSelectSlot}
        />
        <AddNewFab />
        {activeEvent && <DeleteEventFab />}
        <CalendarModal />
      </Container>
    </div>
  );
};
