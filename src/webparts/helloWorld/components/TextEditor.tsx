import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  | "video";

type EditorProps = {
  onEditorChange: (content: string) => void;
};

const Editor: React.FC<EditorProps> = ({ onEditorChange }) => {
  const [value, setValue] = React.useState("");

  const handleChange = (
    content: string,
    delta: any,
    source: any,
    editor: any
  ) => {
    setValue(content);
    onEditorChange(content); // Pass the content back to the parent component
  };

  const modules: EditorModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
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
