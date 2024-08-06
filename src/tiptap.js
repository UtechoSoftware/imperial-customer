
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { storage } from "./config/firebase"; 
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"; 
import Resizer from "react-image-file-resizer";

const CKEditorComponent = ({ setckData }) => {
  const MyUploadAdapter = (loader) => {
    return {
      upload() {
        return loader.file.then((file) =>
          new Promise((resolve, reject) => {
            const storageRef = ref(storage, `images/${file.name}`); 
            const uploadTask = uploadBytes(storageRef, file); 
            uploadTask.then((snapshot) => {
              getDownloadURL(snapshot.ref).then((url) => {
                resolve({ default: url });
              });
            }).catch((error) => {
              reject(error);
            });
          })
        );
      },
      abort() {
      },
    };
  };
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  return (
    <div className="px-4" style={{ borderRadius: "20px" }}>
    <CKEditor
      editor={ClassicEditor}
      config={{
        toolbar: {
          items: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "imageUpload",
            "mediaEmbed",
            "blockQuote",
            "undo",
            "redo",
          ],
        },
        language: "en",
        image: {
            toolbar: [
                'imageTextAlternative',
                'imageStyle:full',
              
            ],
           styles: [
                'full',
                'side',
                {
                    name: 'small',
                    title: 'Small image',
                    icon: 'small', // You can use a custom icon if you have one
                    className: 'image-small' // Define a custom class name
                }
            ]
        },
        mediaEmbed: {
          previewsInData: true,
        },
        licenseKey: "",
      }}
      onReady={(editor) => {

        // Customize the image upload adapter
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
          return MyUploadAdapter(loader);
        };
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log(data,"dd")
      
        setckData(data);
      }}
      onBlur={(event, editor) => {
      }}
      onFocus={(event, editor) => {
      }}
    />
  </div>
  );
};

export default CKEditorComponent;


