import { create } from 'zustand'

type State = {
    user : string | null
}

type Actions = {
    setUser : (name : string) => void
}

const useUserStore = create<State & Actions>((set) => ({
    user : null , 
    setUser : (name : string) => set({user : name})
}));

export default useUserStore;
