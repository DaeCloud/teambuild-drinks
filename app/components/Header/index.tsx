'use client';

import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full py-6 px-16 bg-gray-900 border-b border-black/[.08] dark:border-white/[.145] flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src="/icon.png"
          alt="Team Build Icon"
          className="w-20 h-20 rounded-md"
          width={80}
          height={80}
        />
        <h1 className="text-2xl font-bold text-zinc-50">
          Drink Preferences for Team Build
        </h1>
      </div>
    </header>
  );
}
