import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {PiSignIn, PiSignOut} from "react-icons/pi";
import {useEffect, useRef} from "react";
import clsx from "clsx";
interface SidebarProps {
    setOpen: (open: boolean) => void;
    open: boolean;
}
export default function Sidebar({ setOpen, open }: SidebarProps) {
    const { data: session, status} = useSession();
    const router = useRouter();
    const sideBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (!sideBarRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
            console.log("sda")
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
    console.log(session, status, open);
    return (
        <div ref={sideBarRef} className={clsx(
            "sidebar flex w-1/4 flex-col z-[100] absolute h-full overflow-hidden",
            "max-h-screen bg-[#282c34]/80 backdrop-blur-xl transition-all origin-left duration-500",
            open ? "left-0": "-left-1/4",

        )}>
            <h1 className={"font-bold text-center text-2xl py-3"}>Hi {status === "authenticated" ? session?.user?.name : "User"}</h1>
            <ul className={"flex flex-col gap-2 h-full"}>

                <li onClick={handleClick} className={"mt-auto flex items-center px-3 pb-4 font-bold select-none"}>
                    {status==="authenticated" ? <PiSignOut className={"text-white text-xl"}/>: <PiSignIn className={"text-white text-xl"}/>}
                    <span className={"cursor-pointer mx-auto"}>{ status === "authenticated" ? "Sign Out": "Sign In"}</span>
                </li>
            </ul>
        </div>
    )
}