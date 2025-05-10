import { HttpMethod } from "@/lib/definitions";
import {Dropdown} from "@/components/Inputs/DropDown";

interface URInputProps {
    url: string;
    method: HttpMethod;
    onUrlChange: (url: string) => void;
    onMethodChange: (method: HttpMethod) => void;
}

export default function URInput({ url, method, onUrlChange, onMethodChange }: URInputProps) {
    return (
        <div className="flex items-center space-x-2 px-4 md:px-10">
            <Dropdown options={["GET", "PUT", "POST", "DELETE"]} selected={method} onSelectAction={onMethodChange}/>
            <input
                type="text"
                placeholder="Enter request URL"
                value={url}
                onChange={(e) => onUrlChange(e.target.value)}
                className="flex-1 p-2 border w-3/4 min-w-1/2 border-gray-300 rounded"
            />
        </div>
    )
}
