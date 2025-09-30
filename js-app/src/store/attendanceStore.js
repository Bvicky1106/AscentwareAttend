import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAttendanceStore = create(
  persist(
    (set, get) => ({
      isCheckedIn: false,
      startTime: null,
      elapsedTime: 0,
      timerInterval: null,
      isOnBreak: false,
      breakCount: 0,
      breakStart: null,
      breakElapsed: 0,

      checkIn: () => {
        if (get().isCheckedIn) return;

        const now = Date.now();
        const interval = setInterval(() => {
          if (!get().isOnBreak) {
            const workedTime =
              Date.now() - get().startTime - get().breakElapsed;
            set({ elapsedTime: workedTime });
          }
        }, 1000);

        set({
          isCheckedIn: true,
          startTime: now,
          timerInterval: interval,
          breakElapsed: 0,
          breakCount: 0,
          isOnBreak: false,
          breakStart: null,
          elapsedTime: 0,
        });
      },

      checkOut: () => {
        if (get().timerInterval) clearInterval(get().timerInterval);
        set({
          isCheckedIn: false,
          startTime: null,
          timerInterval: null,
          isOnBreak: false,
          breakStart: null,
          breakElapsed: 0,
          elapsedTime: 0,
          breakCount: 0,
        });
      },

      toggleBreak: () => {
        if (!get().isCheckedIn) return;

        if (get().isOnBreak) {
          // Resume work → stop break
          const now = Date.now();
          const breakDuration = now - get().breakStart;
          set({
            isOnBreak: false,
            breakElapsed: get().breakElapsed + breakDuration,
            breakStart: null,
          });
        } else {
          // Start break
          set({
            isOnBreak: true,
            breakCount: get().breakCount + 1,
            breakStart: Date.now(),
          });
        }
      },

      reset: () => {
        if (get().timerInterval) clearInterval(get().timerInterval);
        set({
          isCheckedIn: false,
          startTime: null,
          elapsedTime: 0,
          timerInterval: null,
          isOnBreak: false,
          breakCount: 0,
          breakStart: null,
          breakElapsed: 0,
        });
      },

      resumeTimer: () => {
        if (!get().isCheckedIn) return;

        const interval = setInterval(() => {
          if (!get().isOnBreak) {
            const workedTime =
              Date.now() - get().startTime - get().breakElapsed;
            set({ elapsedTime: workedTime });
          }
        }, 1000);

        set({ timerInterval: interval });
      },
    }),
    {
      name: "attendance-storage", // save in localStorage
      partialize: (state) => ({
        isCheckedIn: state.isCheckedIn,
        startTime: state.startTime,
        elapsedTime: state.elapsedTime,
        isOnBreak: state.isOnBreak,
        breakCount: state.breakCount,
        breakElapsed: state.breakElapsed,
        breakStart: state.breakStart,
      }),
    }
  )
);
