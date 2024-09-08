// components/RichTextEditor.js
import { Dispatch, SetStateAction, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const RichTextEditor = ({ value, onChange }: { value: string, onChange: Dispatch<SetStateAction<string>> }) => {
    return (
        <ReactQuill value={value} onChange={onChange} theme="snow" />
    );
};

export default RichTextEditor;
