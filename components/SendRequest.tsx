import clsx from "clsx";

interface SendRequestProps {
    onBtnClick: () => void;
    isLoading: boolean;
}

export default function SendRequest({ onBtnClick, isLoading }: SendRequestProps) {
    return (
        <button type={"button"} onClick={onBtnClick} disabled={isLoading} className={clsx(
            "bg-white w-full text-center text-black border-2 rounded-md px-3 py-2 ",
            "active:bg-background active:text-white"
        )}
        >Send Request</button>
    )
}