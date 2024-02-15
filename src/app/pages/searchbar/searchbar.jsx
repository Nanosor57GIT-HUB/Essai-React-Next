"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/styles/searchbar.module.css";
import Autocomplete from "./autocomplete";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        setSuggestions(data.page.map((page) => page.title));
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des suggestions :",
          error
        );
      }
    };

    fetchSuggestions();
  }, []);

  const handleInputChange = (e) => {
    const userInput = e.target.value;

    if (userInput.trim() === "") {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    } else {
      const filteredSuggestions = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(userInput.toLowerCase())
      );
      setActiveSuggestion(0);
      setFilteredSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    }

    setQuery(userInput);
  };

  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearch(query);
  };

  const onKeyDown = (e) => {
    // ...
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Autocomplete
        suggestions={filteredSuggestions}
        onSelect={handleSelectSuggestion}
        userInput={query}
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        activeSuggestion={activeSuggestion}
        filteredSuggestions={filteredSuggestions}
      />
      <button type="submit" className={styles.btnsearch}>
        Rechercher
      </button>
    </form>
  );
};

export default SearchBar;
