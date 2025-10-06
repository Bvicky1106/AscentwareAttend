// src/store/attendanceStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

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

      checkOut: async () => {
        const {
          startTime,
          elapsedTime,
          breakCount,
          breakElapsed,
          isCheckedIn,
          timerInterval,
        } = get();

        if (!isCheckedIn) return;

        // Stop timer
        if (timerInterval) clearInterval(timerInterval);

        try {
          // Prepare data for backend
          const data = {
            startTime: new Date(startTime).toISOString(),
            endTime: new Date().toISOString(),
            workedDuration: Math.floor(elapsedTime / 1000), // seconds
            breakCount,
            totalBreakDuration: Math.floor(breakElapsed / 1000),
          };

          // Send to NestJS backend
          await axios.post("http://localhost:8000/attendance", data);
          console.log("✅ Attendance data sent successfully", data);
        } catch (error) {
          console.error("❌ Error sending attendance data:", error);
        }

        // Reset local state
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
          const now = Date.now();
          const breakDuration = now - get().breakStart;
          set({
            isOnBreak: false,
            breakElapsed: get().breakElapsed + breakDuration,
            breakStart: null,
          });
        } else {
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
      name: "attendance-storage",
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
