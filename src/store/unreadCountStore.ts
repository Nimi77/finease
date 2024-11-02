import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UnreadCountState {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  resetUnreadCount: () => void;
}

export const useUnreadCountStore = create<UnreadCountState>()(
  persist(
    (set) => ({
      unreadCount: 0,
      setUnreadCount: (count) => set({ unreadCount: count }),
      resetUnreadCount: () => set({ unreadCount: 0 }),
    }),
    {
      name: "unreadCount-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
