'use client';

import { useState, useEffect } from 'react';
import { Drink } from '../../models/drink';

export default function InteractiveInput() {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [drinks, setDrinks] = useState<Drink[]>([]);

  useEffect(() => {
    const fetchDrinks = async () => {
      const drinks: Drink[] = await fetch('/api/drinks').then(r => r.json());
      setDrinks(drinks);
    };
    fetchDrinks();
  }, []);

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
    const button = document.querySelector("#addBtn") as HTMLButtonElement | null;

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

    if (!button) {
      console.error("Add button not found");
    } else {
      if(drinks.map(drink => drink.name.trim().toLowerCase()).includes(inputValue.trim().toLowerCase())){
        button.disabled = true;
        button.textContent = "Already Added";
        return;
      } else {
        button.disabled = false;
        button.textContent = "Add";
      }
    }
  }

  function handleSuggestionClick(suggestion: string) {
    setValue(suggestion);
    setSuggestions([]); // Hide suggestions after selecting
  }

  async function handleAdd() {
    const button = document.querySelector("#addBtn") as HTMLButtonElement | null;
  if (!button) {
    console.error("Add button not found");
    return;
  }

  if (!value.trim()) return;

  // Disable button and show loading text
  button.disabled = true;
  const originalText = button.textContent || "";
  button.textContent = "Adding...";

  try {
    const response = await fetch("/api/drinks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: value }),
    });

    if (response.ok) {
      const newDrink = await response.json();
      console.log("Added:", newDrink);
      window.location.reload();
    } else {
      console.error("Failed to add drink");
      button.disabled = false;
      button.textContent = originalText;
    }
  } catch (error) {
    console.error("Error adding drink:", error);
    button.disabled = false;
    button.textContent = originalText;
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
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
        <button
          onClick={handleAdd}
          id="addBtn"
          className="px-4 py-2  rounded-md bg-white text-black hover:bg-gray-200 hover:cursor-pointer"
        >
          Add
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul
          className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-300 rounded-md shadow-lg 
               max-h-48 overflow-y-auto text-white"
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
