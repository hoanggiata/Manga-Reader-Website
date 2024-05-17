// GenreSelection.js
"use client"
import { useState } from "react";

export default function GenreSelection({ genres }) {
  const [activeIndices, setActiveIndices] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function handleOnClickGenres(event) {
    let key = event.target.dataset.id
    const newActiveIndices = [...activeIndices];
    if (newActiveIndices.includes(key)) {
      const indexToRemove = newActiveIndices.indexOf(key);
      newActiveIndices.splice(indexToRemove, 1);
    } else {
      newActiveIndices.push(key);
      console.log(key);
    }
    setActiveIndices(newActiveIndices);
    setInputValue(newActiveIndices.join(","));
    console.log(inputValue);    
  }

  return (
    <div className="flex flex-wrap overflow-hidden">
      <input type="hidden" name="genres" id="genres" value={inputValue} />
      {genres.data.map((genre,index) => (
        <div
          key={genre.id}
          data-id={genre.attributes.name.en}
          className={`bg-[#2f2f2f] rounded-[0.25rem] text-[13px] max-w-max mr-2 mb-2 p-2 cursor-pointer hover:text-[#FFD700] ${activeIndices.includes(genre.attributes.name.en) ? "text-[#FFD700]" : ""}`}
          onClick={handleOnClickGenres}>
          {genre.attributes.name.en}
        </div>
      ))}
    </div>
  );
}
