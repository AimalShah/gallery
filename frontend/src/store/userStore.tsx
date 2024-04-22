import { create } from 'zustand'

interface User {
        email : string;
        id : string;
        name : string;
}

interface UserStore {
    user : User | null;
    setUser : (user : User | null) => void;
    setName : (newName : string) => void;
}

const useUserStore = create<UserStore>((set) => ({
    user : null , 
    setUser : (user : User | null) => set({user}),
    setName : (newName : string) => set((state) => ({
        user : state.user ? {...state.user , name : newName } : null
    }))
}));

export default useUserStore;
