"use client";

import { useEditorStore } from "@/app/store/editorStore";
import FontFamily from "@tiptap/extension-font-family";
import Strike from "@tiptap/extension-strike";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
export default function DocumentEditor({ temp }: { temp: string | null }) {
  const { setEditor } = useEditorStore();
  const editor = useEditor({
    onCreate(props) {
      setEditor(props.editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onSelectionUpdate(props) {
      setEditor(props.editor);
    },
    onTransaction(props) {
      setEditor(props.editor);
    },
    onFocus(props) {
      setEditor(props.editor);
    },
    onBlur(props) {
      setEditor(props.editor);
    },
    onContentError(props) {
      setEditor(props.editor);
    },
    editorProps: {
      attributes: {
        style: "padding-left: 56px; padding-right: 56px;",
        class:
          "focus:outline-none print:boreder-0 bg-white shadow rounded border border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pb-10 pr-14 cursor-text",
      },
    },
    extensions: [StarterKit, Strike, Underline, FontFamily, TextStyle],
    content: temp,
  });
  return (
    <div className="size-full overflow-x-auto bg-[#f9fdfb] px-4 print:px-0 print:bg-white print:overflow-visible">
      <div className="min-w-max flex justify-center w-[816px] mx-auto py-8 print:py-0 print:w-full print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
