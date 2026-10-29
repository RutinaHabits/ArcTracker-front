import { RootState } from "@/store";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "./types";

const todayISO = new Date().toLocaleDateString("sv-SE");

export const habitSlice = createSlice({
  name: "habits",
  initialState: {
    selectedDate: todayISO,
    localSearch: "",
    globalSearch: "",
  },
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setLocalSearch: (state, action: PayloadAction<string>) => {
      state.localSearch = action.payload;
    },
    setGlobalSearch: (state, action: PayloadAction<string>) => {
      state.globalSearch = action.payload;
    },
  },
});

const selectLocalSearchQuery = (state: RootState) => state.habits.localSearch;
const selectGlobalSearchQuery = (state: RootState) => state.habits.globalSearch;

export const selectFilteredLocalTasks = createSelector(
  [(_, tasks: Task[]) => tasks, selectLocalSearchQuery],
  (tasks, query) => {
    if (!query.trim()) return tasks;
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(query.toLowerCase()),
    );
  },
);

export const selectFilteredGlobalTasks = createSelector(
  [(_, tasks: Task[]) => tasks, selectGlobalSearchQuery],
  (tasks, query) => {
    if (!query.trim()) return tasks;
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(query.toLowerCase()),
    );
  },
);

export const { setSelectedDate, setLocalSearch, setGlobalSearch } =
  habitSlice.actions;
