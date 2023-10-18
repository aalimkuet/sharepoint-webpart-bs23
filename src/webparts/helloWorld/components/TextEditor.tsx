import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./table.css";

type EditorModules = {
  toolbar: any[][];
  clipboard: { matchVisual: boolean };
};

type EditorFormats =
  | "header"
  | "font"
  | "size"
  | "bold"
  | "italic"
  | "underline"
  | "strike"
  | "blockquote"
  | "list"
  | "bullet"
  | "indent"
  | "link"
  | "image"
  | "color"
  | "align"
  | "video"
  | "clean"
;

type EditorProps = {
  onEditorChange: (content: string) => void;
};

const Editor: React.FC<EditorProps> = ({ onEditorChange }) => {
  const [value, setValue] = React.useState("");

  const handleChange = (content: string) => {
    setValue(content);
    onEditorChange(content);
  };

  const modules: EditorModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ align: [] }],
      ["link", "image", "video"], 
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats: EditorFormats[] = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "color",
    "clean",
  ];

  return (
    <div>
      <ReactQuill
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
