import { create } from "zustand";

interface User {
    id: string;
    name: string;
}

interface ImageData {
    imageName: string;
    imageUrl: string;
    uploadUser: User;
    _v: number;
    _id: string;
}

interface StoreState {
    data: ImageData[] | null;
    setData: (data: ImageData[] | null) => void;
}

const useImageStore = create<StoreState>((set) => ({
    data: null,
    setData: (data: ImageData[] | null) => set({ data }),
}));

export default useImageStore;
