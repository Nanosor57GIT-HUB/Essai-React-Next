"use client"

import { useTheme } from '@/app/context/themecontext';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './searchbar';

const SearchPage = () => {
  const { theme } = useTheme();
 
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    // ...
  }, []);

  const handleSearch = async (query) => {
    try {
      const response = await fetch('/data.json');
      const data = await response.json();

      const matchingResults = data.page.filter(page =>
        page.title.toLowerCase().includes(query.toLowerCase())
      );

      if (matchingResults.length === 0) {
        setSearchResults([]);
        setSearchError('Aucun résultat trouvé.');
      } else {
        setSearchResults(matchingResults);
        setSearchError('');
      }
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
  };

  return (
    <main className='mainpages'>
      <div className="pagesearchbar"  style={{
          background: theme.background,
        }}>
        {/* ... */}
        <SearchBar onSearch={handleSearch} />
        <h2 style={{
          color: theme.color,
        }}>Résultats de la recherche :</h2>
        {searchError ? (
          <p className='error-message'>{searchError}</p>
        ) : (
          <ol type='I' className='olsearch'>
            {searchResults.map((result, index) => (
              <li className='lisearch' key={index}>
                <Link href={result.path === "/" ? "/" : `/page/${result.path}`} className='linksearch'>
                  <div className='resultsearch'>{result.title}</div>
                </Link>
              </li>
            ))}
          </ol>
        )}
        <div className='containerrobot8'>
        <Image priority={true} as="image" src="/images/robots/robot8.webp" alt="robot8" className="robot8" width={670} height={600} />
      </div>
      </div>
    </main>
  );
};

export default SearchPage;









