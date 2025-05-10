import Editor from "@/components/Inputs/Editor";

interface ResponseWindowProps {
    data: Object | null;
}
export default  function ResponseWindow({ data }: ResponseWindowProps) {
    return (
        <div className={"inset-0 bg-[#282c34]"}>
            <Editor text={data !== null ? JSON.stringify(data,null,2) : ""}/>
        </div>
    )
}