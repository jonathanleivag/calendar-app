import "@testing-library/jest-dom";
import { messages } from "../../helpers/calendar-messages-es";
describe("prueba para calendar-messages-es", () => {
  test("calendar-messages-es tienes que ser iguales", () => {
    const messagesEqual = {
      allDay: "Todo el día",
      previous: "<",
      next: ">",
      today: "Hoy",
      month: "Mes",
      week: "Semana",
      day: "Día",
      agenda: "Agenda",
      date: "Fecha",
      time: "Hora",
      event: "Evento",
      noEventsInRange: "No hay eventos en este rango",
      showMore: (total) => `+ Ver más (${total})`,
    };
    expect(messages.toString()).toEqual(messagesEqual.toString());
    expect(messagesEqual.showMore(13)).toBe(`+ Ver más (${13})`);
  });
})
//TODO: