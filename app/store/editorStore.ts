import { create } from "zustand";

type EditorStore = {
  editor: any;
  setEditor: (editor: any) => void;
};
export const useEditorStore = create<EditorStore>((set) => ({
  editor: null,
  setEditor: (editor: any) => set({ editor }),
}));
