'use client';

import { useState } from 'react';

export default function InteractiveInput() {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const drinkOptions = [
    'Beer',
    'Lager',
    'Pale Ale',
    'IPA',
    'Stout',
    'Porter',
    'Pilsner',
    'Cider',
    'Red Wine',
    'White Wine',
    'Rosé Wine',
    'Champagne',
    'Prosecco',
    'Whiskey',
    'Scotch',
    'Bourbon',
    'Vodka',
    'Gin',
    'Rum',
    'Tequila',
    'Brandy',
    'Cognac',
    'Mead',
    'Sake',
    'Cocktail',
    'Mojito',
    'Margarita',
    'Martini',
    'Old Fashioned',
    'Negroni',
    'Cosmopolitan',
    'Bloody Mary',
    'Water',
    'Sparkling Water',
    'Tonic Water',
    'Soda Water',
    'Lemonade',
    'Cola',
    'Ginger Ale',
    'Ginger Beer',
    'Iced Tea',
    'Hot Tea',
    'Coffee',
    'Espresso',
    'Cappuccino',
    'Latte',
    'Hot Chocolate',
    'Milk',
    'Chocolate Milk',
    'Juice',
    'Orange Juice',
    'Apple Juice',
    'Cranberry Juice',
    'Pineapple Juice',
    'Grapefruit Juice',
    'Smoothie',
    'Energy Drink',
    'Mocktail',
    'Non-Alcoholic Beer',
    'Non-Alcoholic Wine',
  ];

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    setValue(inputValue);

    if (inputValue.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = drinkOptions.filter((drink) =>
      drink.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  }

  function handleSuggestionClick(suggestion: string) {
    setValue(suggestion);
    setSuggestions([]); // Hide suggestions after selecting
  }

  async function handleAdd() {
    if (value.trim()) {

      const response = await fetch('/api/drinks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: value }),
      });

      if (response.ok) {
        const newDrink = await response.json();
        console.log('Added:', newDrink);

        // refresh the page
        window.location.reload();
      } else {
        console.error('Failed to add drink');
      }
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Your favorite drink..."
          value={value}
          onChange={handleInputChange}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2  rounded-md bg-white text-black hover:bg-gray-200 hover:cursor-pointer"
        >
          Add
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul
          className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-300 rounded-md shadow-lg 
               max-h-48 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-700"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}
