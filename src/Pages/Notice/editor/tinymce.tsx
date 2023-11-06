import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import quillEmoji from "quill-emoji";
import "quill-emoji/dist/quill-emoji.css";
import { ImageDrop } from "quill-image-drop-module";
const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;
Quill.register(
  {
    "formats/emoji": EmojiBlot,
    // "formats/video": VideoBlot,
    "modules/emoji-shortname": ShortNameEmoji,
    "modules/emoji-toolbar": ToolbarEmoji,
    "modules/emoji-textarea": TextAreaEmoji,
    // 'modules/ImageExtend': ImageExtend, //拖拽图片扩展组件
    "modules/ImageDrop": ImageDrop, //复制粘贴组件
  },
  true
);
function EditorPanel(props) {
  const modules = {
    history:{
      delay: 2000,
      maxStack: 500,
      userOnly: true
    },
    clipboard: {
      matchVisual: false,
    },

    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["link",  "blockquote", "code-block"],
      // [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["emoji"],
      ["video","image",],
      ["clean"],
    ],
    ImageDrop: true,
    "emoji-toolbar": true, //是否展示出来
    "emoji-textarea": false, //我不需要emoji展示在文本框所以设置为false
    "emoji-shortname": true,
  };
  // let [text, setText] = useState();
  function handleChange(val) {
    // setText(val);
    props?.onChange(val)
  }
  return (
    <ReactQuill
      modules={modules}
      placeholder="请输入内容"
      value={props.value}
      onChange={handleChange}
    />
  );
}

export default EditorPanel;
