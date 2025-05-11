'use client';
import {useEffect, useState} from "react";
import URInput from "@/components/Inputs/URLInput";
import clsx from "clsx";
import {HttpMethod, Pair} from "@/lib/definitions";
import ResponseWindow from "@/components/ResponseWindow";
import SendRequest from "@/components/SendRequest";
import RequestOptions from "@/components/RequestOptions";
import Sidebar from "@/components/Sidebar";
import {FiMenu} from "react-icons/fi";
import {useSession} from "next-auth/react";

async function saveInHistory(userId: string, reqUrl: string, method: HttpMethod, headers: Pair[], params: Pair[], body:Object | null) {
    if (!userId) return;
    const url = `/api/users/${userId}/req-history`;
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            url:reqUrl,
            method,
            headers: JSON.stringify(headers),
            queryParams: JSON.stringify(params),
            body: JSON.stringify(body)
        })
    })
}

export default function RestClient() {
    const [url, setUrl] = useState<string>("");
    const [method, setMethod] = useState<HttpMethod>("GET");
    const [resData, setResData] = useState<Object | null>(null);
    const [body, setBody] = useState<Object | null>(null);
    const [headers, setHeaders] = useState<Pair[]>([]);
    const [params, setParams] = useState<Pair[]>([]);
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
    const [history, setHistory] = useState<Object[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {data:session, status} = useSession();

    useEffect(()=>{
        if (!session?.user?.id) return;
        console.log("here")
        fetch(`/api/users/${session.user.id}/req-history`)
            .then(res => res.json())
            .then(data=> {
                console.log(data);
                setHistory(data.map((item: any) => {
                    item.headers = JSON.parse(item.headers || "[]");
                    item.params = JSON.parse(item.queryParams || "[]");
                    item.body = JSON.parse(item.body || {});
                    return item;
                }));
            }).catch(e=>console.log(e));
    },[session])

    const onUrlChange = (url: string) => {
        setUrl(url);
    }

    const onMethodChange = (method: HttpMethod) => {
        setMethod(method);
    }

    const sendRequest = async () => {
        setIsLoading(true);
        const reqUrl = new URL(url);

        // Adding query parameters
        for (const param of params) {
            if (param.key && param.value) {
                reqUrl.searchParams.append(param.key, param.value);
            }
        }

        // Preparing header object
        const headersObj = new Headers();
        for (const header of headers) {
            if (header.key && header.value) {
                headersObj.append(header.key, header.value);
            }
        }
        // Sending request
        try {
            if (session?.user?.id) {
                setHistory([{url: reqUrl.toString(), method, headers, params, body}, ...history]);
                console.log(history,'asd');
                await saveInHistory(session?.user?.id,reqUrl.toString(), method, headers, params, body)
            }
            const res = await fetch(reqUrl.toString(), {
                    method: method,
                    headers: headersObj,
                    body: method==="GET" ? null:JSON.stringify(body)
                });
            if (res.ok) {
                const data = await res.json();
                setResData(data);
            } else {
                setResData({ statusCode: res.status, response: await res.text() });
            }
        } catch (e) {
            setResData({ error: e });
        } finally {
            setIsLoading(false);
        }
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

    // sidebar handling
    const openSidebar = (value: boolean) => {
        setSideBarOpen(value);
    }

    const loadHistory = (index: number) => {
        const h = history[index];
        setParams(h.params || []);
        setHeaders(h.headers || []);
        setMethod(h.method);
        setUrl(h.url);
        setBody(h.body || {})
        setSideBarOpen(false);
    }
    return (
        <>
            <div className={clsx(
                "grid grid-cols-1 lg:grid-cols-2 w-full h-screen"
            )}>
                <Sidebar open={sideBarOpen} setOpen={openSidebar} history={history} loadHistory={loadHistory}/>
                <div className={"w-full  px-4 md:px-8"}>
                    <div className={"flex text-xl px-2 py-3"}>
                        <FiMenu className={"text-white cursor-pointer"} onClick={()=>openSidebar(true)}/>
                    </div>
                    <URInput url={url} method={method} onUrlChange={onUrlChange} onMethodChange={onMethodChange}/>
                    <SendRequest onBtnClick={sendRequest} isLoading={isLoading}/>
                    <RequestOptions headers={headers} params={params} body={body} addRow={addRow} updateRow={updateRow} deleteRow={deleteRow} updateBody={handleBodyChange}/>
                </div>
                <ResponseWindow data={resData}/>
            </div>
        </>
    )
}
