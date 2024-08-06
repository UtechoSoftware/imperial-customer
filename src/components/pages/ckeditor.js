/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const MyEditor = () => {
    const [editorData, setEditorData] = useState('');

    // Image upload handler
    const handleImageUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('https://your-api.com/uploadImage', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const data = await response.json();
            const imageUrl = data.url;

            return { default: imageUrl };
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    // Video upload handler
    const handleVideoUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('https://your-api.com/uploadVideo', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload video');
            }

            const data = await response.json();
            const videoUrl = data.url;

            return { default: videoUrl };
        } catch (error) {
            console.error('Error uploading video:', error);
            throw error;
        }
    };

    // PDF upload handler
    const handlePdfUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('https://your-api.com/uploadPdf', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload PDF');
            }

            const data = await response.json();
            const pdfUrl = data.url;

            return { default: pdfUrl };
        } catch (error) {
            console.error('Error uploading PDF:', error);
            throw error;
        }
    };

    return (
        <div>
            <h2>CKEditor</h2>
            <CKEditor
                editor={ClassicEditor}
                // data={description}
                config={{
                    ckfinder: {
                        // Customize this URL to point to your CKFinder connector
                        uploadUrl: '/path/to/your/connector',
                    },
                    toolbar: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        'blockQuote',
                        '|',
                        'imageUpload',
                        'ckfinder',
                        'mediaEmbed',
                        'insertTable',
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells',
                        '|',
                        'undo',
                        'redo',
                    ],
                }}
            // onChange={handleCKEditor}
            />
        </div>
    );
};

export default MyEditor;
