import { useEditorStore } from "@/app/store/editorStore";
import {
  Baseline,
  BoldIcon,
  ItalicIcon,
  Printer,
  SpellCheck,
  Strikethrough,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { useState } from "react";
import { CirclePicker, type ColorResult } from "react-color";

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
    [
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
  ];
  return (
    <>
      <div className="flex items-center p-2 bg-gray-50 shadow-sm gap-2 border-b">
        <div className="flex gap-2">
          {sections[0].map((section, i) => (
            <ToolbarButton key={i} {...section} />
          ))}
        </div>
        <div>
          <FontFamilyButton />
        </div>
        <div>
          <HeadingLevelButton />
        </div>
        <div className="flex gap-2">
          {sections[2].map((section, i) => (
            <ToolbarButton key={i} {...section} />
          ))}
        </div>
        <div className="w-px h-6 bg-gray-300" />
        <div className="flex gap-2">
          {sections[1].map((section, i) => (
            <ToolbarButton key={i} {...section} />
          ))}
        </div>
        <div>
          <TextColorButton />
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
      className={`p-2 rounded transition-colors ${
        isActive ? "bg-gray-200" : "hover:bg-gray-200"
      }`}
    >
      {icon}
    </button>
  );
};

const TextColorButton = () => {
  const { editor } = useEditorStore();
  const [isOpen, setIsOpen] = useState(false);
  const value = editor?.getAttributes("textStyle")?.color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 rounded hover:bg-gray-200"
      >
        <Baseline />
      </button>
      {isOpen && (
        <div className="absolute mt-2 bg-white border border-gray-300 rounded shadow-lg p-2 z-10">
          <CirclePicker color={value} onChange={onChange} />
        </div>
      )}
    </div>
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
      className="h-10 px-3 outline-none border rounded-md appearance-none font-mono"
      onChange={(e) =>
        editor?.chain().focus().setFontFamily(e.target.value).run()
      }
    >
      {fonts.map((font, i) => (
        <option key={i} value={font.value} style={{ fontFamily: font.value }}>
          {font.label}
        </option>
      ))}
    </select>
  );
};
const HeadingLevelButton = () => {
  const { editor } = useEditorStore();
  const headings = [
    { label: "Normal", value: 0, fontSize: "16px" },
    { label: "Heading H1", value: 1, fontSize: "32px" },
    { label: "Heading H2", value: 2, fontSize: "24px" },
    { label: "Heading H3", value: 3, fontSize: "20px" },
    { label: "Heading H4", value: 4, fontSize: "16px" },
    { label: "Heading H5", value: 5, fontSize: "14px" },
    { label: "Heading H6", value: 6, fontSize: "12px" },
  ];

  return (
    <select
      className="h-10 px-3 outline-none border rounded-md appearance-none font-mono"
      onChange={(e) => {
        if (Number(e.target.value) === 0) {
          editor?.chain().focus().setParagraph().run();
        } else {
          editor
            ?.chain()
            .focus()
            .toggleHeading({ level: Number(e.target.value) })
            .run();
        }
      }}
    >
      {headings.map((heading, i) => (
        <option
          key={i}
          value={heading.value}
          style={{ fontSize: heading.fontSize }}
          defaultValue={
            (heading.value === 0 && !editor?.isActive("heading1")) ||
            editor?.isActive(`heading`, { level: heading.value })
          }
        >
          {heading.label}
        </option>
      ))}
    </select>
  );
};
