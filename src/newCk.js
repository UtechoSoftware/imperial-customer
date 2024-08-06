import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { storage } from "./config/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const CKEditorComponent = ({setckData,ckData} ) => {
  console.log(ckData,"d")
  const MyUploadAdapter = (loader) => {
    return {
      upload() {
        return loader.file.then(
          (file) =>
            new Promise(async (resolve, reject) => {
              try {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = async () => {
                  const dataURL = reader.result;
                  const storageRef = ref(storage, `images/${file.name}`);
                  uploadString(storageRef, dataURL, "data_url")
                    .then((snapshot) => {
                      getDownloadURL(snapshot.ref).then((url) => {
                        console.log("Uploaded and got URL:", url);
                        resolve({ default: url });
                      });
                    })
                    .catch((error) => {
                      console.error("Upload error:", error);
                      reject(error);
                    });
                };
              } catch (error) {
                console.error("Resize error:", error);
                reject(error);
              }
            })
        );
      },
      abort() { },
    };
  };

  return (
    <div style={{ borderRadius: "20px" }}>
      <CKEditor
        editor={ClassicEditor}
        data={ckData}
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
              "imageTextAlternative",
              "imageStyle:full",
              "imageStyle:side",
            ],
            styles: [
              "full",
              "side",
              {
                name: "small",
                title: "Small image",
                icon: "small",
                className: "image-small",
              },
            ],
          },
          mediaEmbed: {
            previewsInData: true,
          },
          licenseKey: "",
        }}
        onReady={(editor) => {
          editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return MyUploadAdapter(loader);
          };
        }}
        
        onChange={(event, editor) => {
          const ckEditorContent = editor.getData();
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = ckEditorContent;
          const imgElements = tempDiv.querySelectorAll('img');
          imgElements.forEach((imgElement) => {
            imgElement.setAttribute('style', 'width: 100%; height: 250px; object-fit: contain;');
          });
          setckData(tempDiv.innerHTML);
        }}
        onBlur={(event, editor) => { }}
        onFocus={(event, editor) => { }}
      />
    </div>
  );
};

export default CKEditorComponent;
