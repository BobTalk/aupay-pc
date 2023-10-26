
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

 
const handleEditorChange = (content: any, editor: any) => {
  console.log('Content was updated:', content);
}
 
const EditorPanel =()=> {
  const editorRef: any = useRef(null);
   return (
     <>
       <Editor
         onInit={(evt, editor) => editorRef.current = editor}
         init={{
           height: '100%',
           menubar: false,
           language: 'zh_CN',
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
        onEditorChange={handleEditorChange}
       />
     </>
   );     
  }
export default EditorPanel