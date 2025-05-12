import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {PiSignIn, PiSignOut} from "react-icons/pi";
import {useEffect, useRef} from "react";
import clsx from "clsx";
import {HistoryItem} from "@/lib/definitions";

interface SidebarProps {
    setOpen: (open: boolean) => void;
    open: boolean;
    history: HistoryItem[];
    loadHistory: (index:number) => void;
}
export default function Sidebar({ setOpen, open, history, loadHistory }: SidebarProps) {
    const { data: session, status} = useSession();
    const router = useRouter();
    const sideBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (!sideBarRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        window.addEventListener('mousedown', handleClick);
        return () => window.removeEventListener('mousedown', handleClick);
    }, []);

    const handleClick = () => {
        if (status === "authenticated") {
            router.push("/api/auth/signout");
        } else {
            router.push("/api/auth/signin");
        }
    }
    return (
        <div ref={sideBarRef} className={clsx(
            "sidebar flex w-1/4 flex-col z-[100] absolute h-full overflow-hidden",
            "max-h-screen bg-[#282c34]/80 backdrop-blur-xl transition-all origin-left duration-500",
            open ? "left-0": "-left-1/4",

        )}>
            <h1 className={"font-bold text-center text-2xl py-3"}>Hi {status === "authenticated" ? session?.user?.name : "User"}</h1>
            <div className={"h-full overflow-y-auto"} style={{ scrollbarWidth: "none" }}>
            <ul className={"flex flex-col gap-2"}>
                <li className={"text-center text-xl font-bold"}>History</li>
                { history?.length>0 && status==="authenticated" ? history.map((item, index) => {
                    return (
                        <li key={index} onClick={()=>loadHistory(index)} className={"mx-3 flex overflow-x-auto whitespace-nowrap py-2 gap-2 cursor-pointer"} style={{ scrollbarWidth: "none" }}>
                            <span className={"font-bold"}>{item.method}</span>
                            <span>{item.url}</span>
                        </li>
                    )
                }) : <li className={"text-center"}>Sign In to Save History</li>}
            </ul>
            </div>
            <div onClick={handleClick} className={"mt-auto flex items-center px-3 pb-4 pt-2 font-bold select-none"}>
                {status==="authenticated" ? <PiSignOut className={"text-white text-xl"}/>: <PiSignIn className={"text-white text-xl"}/>}
                <span className={"cursor-pointer mx-auto"}>{ status === "authenticated" ? "Sign Out": "Sign In"}</span>
            </div>
        </div>
    )
}