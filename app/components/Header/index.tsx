'use client';

export default function Header() {
    function handleLogin() {
        // Handle admin login logic
        alert('Admin login clicked');
    }

  return (
    <header className="w-full py-6 px-16 bg-white dark:bg-black border-b border-black/[.08] dark:border-white/[.145] flex items-center justify-between">
      <h1 className="text-2xl font-bold text-black dark:text-zinc-50">
        Drink Preferences for Team Build
      </h1>

      <button className="mt-4 px-4 py-2 bg-foreground text-background rounded-full hover:bg-[#383838] dark:hover:bg-[#ccc] hover:cursor-pointer" onClick={handleLogin}>
        Admin Login
      </button>
    </header>
  );
}