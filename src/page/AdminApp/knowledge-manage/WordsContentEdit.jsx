import React, { useEffect, useState } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html'
import { Editor } from "react-draft-wysiwyg";
export default function WordsContentEdit(props) {
    useEffect(() => {
        // html-===> draft,
        //https://jpuri.github.io/react-draft-wysiwyg/#/docs 
        const html = props.content
        //库问题
        if (html === undefined) return
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState)
        }
    }, [props.content])
    const [editorState, setEditorState] = useState("")

    return (
        <Editor
            editorState={editorState}
            toolbarClassName="aaaaa"
            wrapperClassName="bbbbb"
            editorClassName="ccccc"
            onEditorStateChange={(editorState) => setEditorState(editorState)}
            onBlur={() => {
                props.getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
            }}
        />
    )
}
