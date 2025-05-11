import clsx from "clsx";
import { useState } from "react";
import {Pair} from "@/lib/definitions";
import KeyValueInput from "@/components/Inputs/KeyValueInput";
import Editor from "@/components/Inputs/Editor";
interface RequestOptionsProps {
    headers: Pair[];
    params: Pair[];
    body: Object | null;
    addRow: (context?:string) => void;
    updateRow: (index: number, field: 'key'|'value', value: string, context?:string) => void;
    deleteRow: (index: number, context?: string) => void;
    updateBody: (value: string) => void;
}
export default function RequestOptions({ headers, params, body, addRow, updateRow, deleteRow, updateBody}: RequestOptionsProps) {
    const [active, setActive] = useState<string>("headers");
    const changeActive = (option: string) => {
        setActive(option);
    }

    return (
        <div className={"w-full mb-4"}>
            <ul className={"flex gap-2 pt-2 pb-3"}>
                <li onClick={()=>changeActive("headers")} className={clsx(
                    "font-bold rounded-md px-2 py-1 cursor-pointer",
                    { "bg-white text-black" : active === "headers" },
                )}>Headers</li>

                <li onClick={()=>changeActive("params")} className={clsx(
                    "font-bold rounded-md px-2 py-1 cursor-pointer",
                    { "bg-white text-black" : active === "params" },
                )}>Params</li>
                <li onClick={()=>changeActive("body")} className={clsx(
                    "font-bold rounded-md px-2 py-1 cursor-pointer",
                    { "bg-white text-black" : active === "body" },
                )}>Body</li>
            </ul>
            {active==="headers" && <KeyValueInput pairs={headers} addRow={addRow} updateRow={updateRow} deleteRow={deleteRow}
                            context={"headers"}/>}
            {active==="params" && <KeyValueInput pairs={params} addRow={addRow} updateRow={updateRow} deleteRow={deleteRow}
                                                 context={"params"}/>}
            {active==="body" && <Editor text={JSON.stringify(body || {},null,2)} editable={true} linting={true} onChange={updateBody} className={"my-2 bg-[#282c34]"}/>}

        </div>
    )
}