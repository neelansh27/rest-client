import RestClient from "@/components/RestClient";
import ClientSessionProvider from "@/components/Session/ClientSessionWrapper";
export default function Home() {
  return (
      <div className={"w-full h-screen"}>
          <ClientSessionProvider>
            <RestClient/>
          </ClientSessionProvider>
      </div>
  );
}