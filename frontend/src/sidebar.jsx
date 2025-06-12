import { Home, Paperclip, Settings, User } from 'lucide-react';

export default function Sidebar({ onSelect }) {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-4 space-y-4">
      <div className="text-2xl font-bold mb-6">{'<'}<span className="text-blue-500">/</span>{'>'} BootLabs</div>

      <nav className="flex flex-col space-y-2">
        <NavItem icon={<Home size={20} />} label="Dashboard" onClick={() => onSelect('dashboard')} />
        <NavItem icon={<Paperclip size={20} />} label="Tickets" onClick={() => onSelect('tickets')} />
        <NavItem icon={<User size={20} />} label="Profile" onClick={() => onSelect('profile')} />
        <NavItem icon={<Settings size={20} />} label="Settings" onClick={() => onSelect('settings')} />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition-colors cursor-pointer"
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

