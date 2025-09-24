import { create } from "zustand";

export const useAttendanceStore = create((set, get) => ({
  isCheckedIn: false,
  startTime: null,
  elapsedTime: 0, // total worked time in ms
  timerInterval: null,
  isOnBreak: false,
  breakCount: 0,
  breakStart: null,
  breakElapsed: 0, // total break time in ms

  // Real-time check-in
  checkIn: () => {
    if (get().isCheckedIn) return;

    const now = Date.now();

    const interval = setInterval(() => {
      if (!get().isOnBreak) {
        const workedTime = Date.now() - get().startTime - get().breakElapsed;
        set({ elapsedTime: workedTime });
      } else if (get().isOnBreak && get().breakStart) {
        // Update break elapsed
        const breakTime = Date.now() - get().breakStart;
        set({
          breakElapsed: get().breakElapsed + breakTime,
          breakStart: Date.now(),
        });
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
    const interval = get().timerInterval;
    if (interval) clearInterval(interval);
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
      // Resume work
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
}));
