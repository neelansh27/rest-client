'use client';
import {useState} from "react";
import URInput from "@/components/Inputs/URLInput";
import clsx from "clsx";
import {HttpMethod, Pair} from "@/lib/definitions";
import ResponseWindow from "@/components/ResponseWindow";
import SendRequest from "@/components/SendRequest";
import RequestOptions from "@/components/RequestOptions";

export default function RestClient() {
    const [url, setUrl] = useState<string>("");
    const [method, setMethod] = useState<HttpMethod>("GET");
    const [resData, setResData] = useState<Object | null>(null);
    const [body, setBody] = useState<Object | null>(null);
    const [headers, setHeaders] = useState<Pair[]>([]);
    const [params, setParams] = useState<Pair[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onUrlChange = (url: string) => {
        setUrl(url);
    }

    const onMethodChange = (method: HttpMethod) => {
        setMethod(method);
    }

    const sendRequest = async () => {
        setIsLoading(true);
        const res = await fetch(url, {
            method: method,
        })
        const data = await res.json();
        setResData(data);
        setIsLoading(false);
    }

    // Functions to handle Header and Query Params input
    const addRow = (context?: string) => {
        if (context==='headers') {
            setHeaders([...headers, {key: "", value: ""}])
        } else if (context==='params') {
            setParams([...params, {key: "", value: ""}])
        }
    }
    const updateRow = (index: number, field: 'key'|'value', value: string, context?: string) => {
        if (context==='headers') {
            setHeaders(headers.map((pair: Pair, i: number): Pair=>{
                    return (i === index) ? {...pair, [field]: value}: pair;
            }))
        } else if (context==='params') {
            setParams(params.map((pair: Pair, i: number): Pair => {
                return (i===index) ? {...pair, [field]: value}: pair ;
            }))
        }
    }
    const deleteRow = (index: number, context?:string) => {
        if (context==='params') {
            setParams(params.filter((_, i) => i !== index))
        } else if (context==='headers') {
            setHeaders(headers.filter((_, i) => i !== index));
        }
    }

    // Function to handle Body input
    const handleBodyChange = (value: string) => {
        try {
            setBody(JSON.parse(value));
        } catch (e) {}
    }
    return (
        <>
            <div className={clsx(
                "grid grid-cols-1 lg:grid-cols-2 w-full h-screen"
            )}>
                <div className={"w-full"}>
                    <URInput url={url} method={method} onUrlChange={onUrlChange} onMethodChange={onMethodChange}/>
                    <SendRequest onBtnClick={sendRequest} isLoading={isLoading}/>
                    <RequestOptions headers={headers} params={params} body={body} addRow={addRow} updateRow={updateRow} deleteRow={deleteRow} updateBody={handleBodyChange}/>
                </div>
                <ResponseWindow data={resData}/>
            </div>
        </>
    )
}
