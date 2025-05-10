'use client';
import {useState} from "react";
import URInput from "@/components/Inputs/URLInput";
import {HttpMethod} from "@/lib/definitions";
import ResponseWindow from "@/components/ResponseWindow";
import clsx from "clsx";
import SendRequest from "@/components/SendRequest";

export default function RestClient() {
    const [url, setUrl] = useState<string>("");
    const [method, setMethod] = useState<HttpMethod>("GET");
    const [resData, setResData] = useState<Object | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onUrlChange = (url: string) => {
        setUrl(url);
    }

    const onMethodChange = (method: HttpMethod) => {
        setMethod(method);
    }

    const sendRequest = async () => {
        console.log("sending")
        setIsLoading(true);
        const res = await fetch(url, {
            method: method,
        })
        const data = await res.json();
        setResData(data);
        setIsLoading(false);
        console.log("done")
    }
    return (
        <>
            <div className={clsx(
                "grid grid-cols-1 lg:grid-cols-2 w-full h-screen"
            )}>
                <div className={"w-full"}>
                    <URInput url={url} method={method} onUrlChange={onUrlChange} onMethodChange={onMethodChange}/>
                    <SendRequest onBtnClick={sendRequest} isLoading={isLoading}/>
                </div>
                <ResponseWindow data={resData}/>
            </div>
        </>
    )
}
