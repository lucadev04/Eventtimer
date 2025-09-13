import { create } from "zustand";

interface Event {
  name: string;
  date: string;
  time: string;
  background?: string;
}

interface EventsState {
  events: Event[];
  addEvent: (event: Event) => void;
  removeEvent: (name: string) => void;
  updateEvent: (name: string | null, data: Partial<Event>) => void;
  loadEvents: () => void;
}

export const useEvents = create<EventsState>((set) => ({
  events: [],

  addEvent: (event) =>
    set((state) => {
      const newEvents = [...state.events, event];
      localStorage.setItem("events", JSON.stringify(newEvents));
      return { events: newEvents };
    }),

  removeEvent: (name) =>
    set((state) => {
      const newEvents = state.events.filter((e) => e.name !== name);
      localStorage.setItem("events", JSON.stringify(newEvents));
      return { events: newEvents };
    }),

  updateEvent: (name, data) =>
    set((state) => {
      if (!state.events.some((e) => e.name === name)) {
        console.warn(`Event ${name} not found, cannot update`);
        return state;
      }

      const newEvents = state.events.map((e) =>
        e.name === name ? { ...e, ...data } : e,
      );

      localStorage.setItem("events", JSON.stringify(newEvents));
      return { events: newEvents };
    }),

  loadEvents: () =>
    set(() => {
      const raw = localStorage.getItem("events");
      return { events: raw ? JSON.parse(raw) : [] };
    }),
}));
