import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  users: [], // Local array to store user data

  currentUser: null, // Logged-in user

  isAuthenticated: false,

  signup: (newUser) => {
    const { users } = get();
    const userExists = users.some((user) => user.email === newUser.email);
    if (userExists) {
      return { success: false, message: "email already exists" };
    }
    set({ users: [...users, newUser] });
    return { success: true, message: "Signup successful" };
  },

  login: (credentials) => {
    const { users } = get();

    // Check if user exists with the correct credentials
    const user = users.find(
      (user) =>
        user.email === credentials.email &&
        user.password === credentials.password
    );
    if (user) {
      set({ currentUser: user, isAuthenticated: true });
      return { success: true, message: "Login successful" };
    }
    return { success: false, message: "Invalid username or password" };
  },

  logout: () => set({ currentUser: null, isAuthenticated: false }),
}));

export default useAuthStore;
