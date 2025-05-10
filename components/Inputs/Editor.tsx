'use client';
import {useRef} from "react";
import {useCodeMirror} from "@uiw/react-codemirror";
import {json} from "@codemirror/lang-json"
import {EditorView} from "@uiw/react-codemirror";

interface EditorProps {
    text: string;
    editable?: boolean;
}

export default function Editor({text, editable=false }: EditorProps) {
    const codeMirrorRef = useRef<HTMLDivElement | null>(null)
    useCodeMirror({
        container: codeMirrorRef.current,
        value: text,
        extensions: [
            json(),
            EditorView.lineWrapping,
        ],
        theme: "dark",
        editable: editable,
    })
    return (
        <div ref={codeMirrorRef} className={"h-screen overflow-y-scroll"}>
        </div>
    )
}