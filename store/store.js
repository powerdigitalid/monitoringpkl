import create from "zustand"

const useLoginStore = create((set) => ({
  isLoggedIn: 0,
  id: '',
  role: '',
  user: '',
  email: '',
  setLogin: () => set((state) => ({isLoggedIn: state.isLoggedIn + 1})),
  setUserId: (id) => set((state) => ({id: id})),
  setRole: (role) => set((state) => ({role: role})),
  setUser: (username) => set((state) => ({user: username})),
  setEmail: (email) => set((state) => ({email: email})),
  setLogout: () => set((state) => ({isLoggedIn: 0, userId: '', role: '', user: '', email: ''})),
}))

export default useLoginStore