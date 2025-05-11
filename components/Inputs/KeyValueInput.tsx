import {Pair} from "@/lib/definitions";
import { MdDeleteOutline } from "react-icons/md";
import clsx from "clsx";

interface KeyValueInputProps {
    pairs: Pair[];
    context?: string;
    addRow: (context?:string) => void;
    updateRow: (index: number, field: 'key'|'value', value: string, context?:string) => void;
    deleteRow: (index: number, context?: string) => void;
}

export default function KeyValueInput({pairs, addRow, updateRow, deleteRow, context}: KeyValueInputProps) {
    return (
        <>
        <div className={"border w-full rounded-t-lg overflow-hidden"}>
            <div className={"grid grid-cols-2"}>
                <div className={"py-2 border-r border-b text-center font-bold"}>Key</div>
                <div className={"py-2 text-center border-b font-bold"}>Value</div>
            </div>
            {pairs.map((pair, index) => (
                <div key={index} className={"grid grid-cols-2 relative border-b"}>
                        <input value={pair.key} onChange={(e) => updateRow(index, 'key', e.target.value, context)} className={"col-span-1 py-2 px-3 border-r focus:outline-none"} />
                    <div className={"flex"}>
                        <input value={pair.value} onChange={(e) => updateRow(index, 'value', e.target.value, context)} className={"py-2 px-3 w-full focus:outline-none"} />
                        <div onClick={()=>deleteRow(index, context)} className={clsx(
                            "text-white bg-black h-full px-2 text-xl",
                            "flex items-center justify-center hover:bg-red-500 active:bg-red-600"
                        )}><MdDeleteOutline /></div>
                    </div>
                </div>
                )
            )}
            <button type={"button"} className={"w-full text-center py-0 hover:bg-white hover:text-black active:bg-black active:text-white focus:outline-none"} onClick={()=>addRow(context)}>
                +
            </button>
        </div>
        </>
    )
}