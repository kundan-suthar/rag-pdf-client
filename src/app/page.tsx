import Sidebar from "./component/Sidebar";

export default function Home() {
  return (
    <div className="flex h-screen w-full font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col bg-gray-800"></main>
    </div>
  );
}
