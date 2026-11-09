import { create } from "zustand";

interface AddPropertyModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useAddPropertyModalStore = create<AddPropertyModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useAddPropertyModalStore;