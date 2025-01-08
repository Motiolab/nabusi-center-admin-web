

import { useState, useEffect, useRef } from 'react';
import { ClassicEditor, AccessibilityHelp, Alignment, Autoformat, AutoLink, Autosave, BlockQuote, Bold, Code, Essentials, FontBackgroundColor, FontColor, FontFamily, FontSize, Highlight, ImageBlock, ImageInsertViaUrl, ImageToolbar, Indent, IndentBlock, Italic, Link, List, Paragraph, RemoveFormat, SelectAll, SpecialCharacters, Strikethrough, Subscript, Superscript, Table, TableToolbar, TextTransformation, Underline, Undo, EditorConfig } from 'ckeditor5';
// import translations from 'ckeditor5/translations/ko.js';
import 'ckeditor5/ckeditor5.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import './index.css';


interface IProps {
    htmlContents?: string;
    setHtmlContents?: Function;
}
const Ckeditor = ({ htmlContents, setHtmlContents }: IProps) => {
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

    const CKEditorComponent = () => {
        if (typeof window === 'undefined') {
            return;
        }
        const editorConfig: EditorConfig = {
            toolbar: {
                items: ['undo', 'redo', 'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|', 'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'code', 'removeFormat', '|', 'link', 'insertImageViaUrl', 'insertTable', 'blockQuote', '|', 'alignment', '|', 'bulletedList', 'numberedList', 'indent', 'outdent'],
                shouldNotGroupWhenFull: false
            },
            plugins: [AccessibilityHelp, Alignment, Autoformat, AutoLink, Autosave, BlockQuote, Bold, Code, Essentials, FontBackgroundColor, FontColor, FontFamily, FontSize, Highlight, ImageBlock, ImageInsertViaUrl, ImageToolbar, Indent, IndentBlock, Italic, Link, List, Paragraph, RemoveFormat, SelectAll, SpecialCharacters, Strikethrough, Subscript, Superscript, Table, TableToolbar, TextTransformation, Underline, Undo],
            fontFamily: { supportAllValues: true },
            fontSize: {
                options: [10, 12, 14, 'default', 18, 20, 22],
                supportAllValues: true
            },
            image: { toolbar: ['imageTextAlternative'] },
            initialData: '',
            language: 'ko',
            link: {
                addTargetToExternalLinks: true,
                defaultProtocol: 'https://',
                decorators: {
                    toggleDownloadable: {
                        mode: 'manual',
                        label: 'Downloadable',
                        attributes: { download: 'file' }
                    }
                }
            },
            placeholder: '',
            table: { contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'] },
            // translations: [translations]
        };
        return (
            <CKEditor editor={ClassicEditor} data={htmlContents ?? ''} config={editorConfig} onChange={(event, editor) => { setHtmlContents?.(editor.getData()); }} />
        );
    };



    return (
        <div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
            <div ref={editorRef}>{isLayoutReady && CKEditorComponent()}</div>
        </div>
    );
}

export default Ckeditor 