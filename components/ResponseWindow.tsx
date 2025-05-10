interface ResponseWindowProps {
    data: Object | null;
}
export default  function ResponseWindow({ data }: ResponseWindowProps) {
    return (
        <div className={"bg-gray-600"}>
            {data!==null ? JSON.stringify(data) : "Send a request to see the response"}
        </div>
    )
}