import { Plus } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 p-4 flex flex-col border-r border-gray-700">
      <button className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors duration-200">
        <Plus />
        New Chat
      </button>
      <div className="mt-8">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Chat History
        </h2>
        <div className="mt-4 text-center text-sm text-gray-500">
          feature coming soon..😊
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
