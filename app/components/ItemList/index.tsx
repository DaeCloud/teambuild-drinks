'use client';

import { useEffect, useState } from 'react';
import { Drink } from '../../models/drink';

export default function ItemList() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDrinks = async () => {
      const drinks: Drink[] = await fetch('/api/drinks').then(r => r.json());
      setDrinks(drinks);
      setLoading(false);
    };
    fetchDrinks();
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-xl text-white font-semibold mb-4">Current Drinks</h2>

      <ul className="w-full bg-gray-900 p-4 rounded-md">
        {loading && (<li className="text-gray-500">Loading...</li>)}
        {drinks.length === 0 && !loading && (
          <li className="text-gray-500">No drinks requested</li>
        )}
        {drinks.map((item, index) => (
          <li
            key={index}
            className="text-white flex justify-between items-center border-b border-gray-700 py-2 last:border-b-0"
          >
            <span>{item.name}</span>
            <div>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full capitalize mx-1
                ${item.status === 'accepted'
                    ? 'bg-green-500/20 text-green-400'
                    : item.status === 'rejected'
                      ? 'bg-red-500/20 text-red-400'
                      : item.status === 'purchased'
                        ? 'bg-blue-500/20 text-blue-400'
                        : item.status === 'none'
                          ? 'opacity-0'
                          : 'bg-yellow-500/20 text-yellow-400'
                  }`}
              >
                {item.status}
              </span>
              {item.purchased == true && (
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full capitalize bg-blue-500/20 text-blue-400 mx-1`}
                >
                  Purchased
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}