import { useEditorStore } from "@/app/store/editorStore";
import {
  BoldIcon,
  ItalicIcon,
  Printer,
  SpellCheck,
  Strikethrough,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";

export default function Toolbar() {
  const { editor } = useEditorStore();
  const sections: {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    isActive: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: <Undo2Icon />,
        onClick: () => editor?.chain().undo().run(),
        isActive: false,
      },
      {
        label: "Redo",
        icon: <Undo2Icon style={{ transform: "scaleX(-1)" }} />,
        onClick: () => editor?.chain().redo().run(),
        isActive: false,
      },
      {
        label: "Print",
        icon: <Printer />,
        onClick: () => window.print(),
        isActive: editor?.isActive("print") ?? false,
      },
      {
        label: "Spell Check",
        icon: <SpellCheck />,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
        isActive: editor?.view.dom.getAttribute("spellcheck") === "true",
      },
    ],
    [
      {
        label: "Bold",
        icon: <BoldIcon />,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold") ?? false,
      },
      {
        label: "Italic",
        icon: <ItalicIcon />,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic") ?? false,
      },
      {
        label: "Underline",
        icon: <UnderlineIcon />,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline") ?? false,
      },
      {
        label: "Strikethrough",
        icon: <Strikethrough />,
        onClick: () => editor?.chain().focus().toggleStrike().run(),
        isActive: editor?.isActive("strike") ?? false,
      },
    ],
  ];
  return (
    <>
      <div className="flex p-2 bg-white shadow-sm gap-1 border-b">
        <div>
          {sections[0].map((section, i) => (
            <ToolbarButton key={i} {...section} />
          ))}
        </div>
        <div>
          <FontFamilyButton />
        </div>
        <div>
          {sections[1].map((section, i) => (
            <ToolbarButton key={i} {...section} />
          ))}
        </div>
      </div>
    </>
  );
}

const ToolbarButton = ({
  icon,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-md hover:bg-gray-100 ${
        isActive ? "bg-gray-100" : ""
      }`}
    >
      {icon}
    </button>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Verdana", value: "Verdana" },
  ];

  return (
    <select
      className="border h-full px-3 appearance-none rounded-md"
      onChange={(e) =>
        editor?.chain().focus().setFontFamily(e.target.value).run()
      }
    >
      <option value={editor?.getAttributes("textStyle").fontFamily || "Arial"}>
        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
      </option>
      {fonts.map((font, i) => (
        <option key={i} value={font.value} style={{ fontFamily: font.value }}>
          <span className="truncate">{font.label}</span>
        </option>
      ))}
    </select>
  );
};
