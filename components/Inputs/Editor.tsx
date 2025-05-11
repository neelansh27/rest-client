'use client';
import {useEffect, useRef} from "react";
import {Extension, useCodeMirror} from "@uiw/react-codemirror";
import {json, jsonParseLinter} from "@codemirror/lang-json"
import {EditorView} from "@uiw/react-codemirror";
import {linter,lintGutter} from "@codemirror/lint";

interface EditorOptions {
    text: string;
    className?: string;
    linting?: boolean;
}

interface Editable extends EditorOptions{
    editable: boolean;
    onChange: (value: string) => void;
}

interface ReadOnlyEditor extends EditorOptions{
    editable?: false;
    onChange?: undefined;
}

type EditorProps = Editable | ReadOnlyEditor;

export default function Editor({text, className, editable=false, linting=false, onChange }: EditorProps) {
    const codeMirrorRef = useRef<HTMLDivElement | null>(null)
    const extensions:Extension[] = [ json(), EditorView.lineWrapping ];
    if (linting) {
        extensions.push(lintGutter(), linter(jsonParseLinter()));
    }
    const {setContainer} = useCodeMirror({
        container: codeMirrorRef.current,
        value: text,
        extensions: extensions,
        theme: "dark",
        editable: editable,
        onChange: onChange,
    })

    useEffect(() => {
       if (codeMirrorRef.current) {
           setContainer(codeMirrorRef.current)
       }
    },[]);
    return (
        <div ref={codeMirrorRef} className={className || "h-screen overflow-y-scroll"}>
        </div>
    )
}