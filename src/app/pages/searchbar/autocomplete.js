"use client"

import Image from "next/image";


const Autocomplete = ({ suggestion, onSelect, userInput, onChange, onKeyDown, activeSuggestion, filteredSuggestions, onClick }) => {
  return (
    <div className="autocomplete">
      <div className="searchbar" >
      <input
        type="text"
        id="recherche" 
        name="recherche"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
        autoComplete="on"
      />
      <Image priority={true} src="/images/loupe.webp" alt="loupe" className="loupesearch" width={256} height={256} />
      </div>

      {filteredSuggestions.length > 0 && (
        <ul className="suggestions">
         

          {filteredSuggestions.map((suggestion, index) => {
            let className = '';
            if (index === activeSuggestion) {
              className = 'suggestion-active';
            }
            return (
              <li
                className={className}
                key={index}
                onClick={() => onClick(suggestion)}
              >
                {suggestion}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;

