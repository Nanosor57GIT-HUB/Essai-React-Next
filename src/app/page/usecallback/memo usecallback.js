import React, { useState, useEffect, useCallback } from 'react';

// useCallback est un crochet (hook) très utile de la bibliothèque React, utilisé pour optimiser les performances des composants en mémorisant une version stable d'une fonction. Cela est particulièrement utile lorsque vous avez des composants enfants qui dépendent de fonctions parentes, car cela évite de recréer ces fonctions à chaque rendu, ce qui peut entraîner des problèmes de performances.

// Voici quelques exemples d'applications de useCallback :

// Optimisation des rendus : Lorsque vous transmettez des fonctions en tant que props à des composants enfants, useCallback peut être utilisé pour mémoriser ces fonctions et s'assurer qu'elles ne sont pas recréées à chaque rendu parent.
// jsx

//import React, { useCallback } from 'react';

function ParentComponent() {
  const handleClick = useCallback(() => {
    // Gérer le clic ici
  }, []);

  return <ChildComponent onClick={handleClick} />;
}

function ChildComponent({ onClick }) {
  return <button onClick={onClick}>Cliquez-moi</button>;
}
// Utilisation avec des effets : useCallback peut également être utilisé pour mémoriser des fonctions utilisées dans des effets, afin de s'assurer que l'effet n'est déclenché que lorsque les dépendances changent.
// jsx

//import React, { useState, useEffect, useCallback } from 'react';

function ExampleComponent() {
  const [count, setCount] = useState(0);

  const handleIncrement = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  useEffect(() => {
    // Faire quelque chose lorsque count change
  }, [count]);

  return (
    <div>
      <p>Compteur: {count}</p>
      <button onClick={handleIncrement}>Incrémenter</button>
    </div>
  );
}
// Optimisation des listes : useCallback est également utile lorsque vous avez des listes de composants et que vous voulez éviter de recréer des fonctions pour chaque élément de la liste.
// jsx

//import React, { useCallback } from 'react';

function ListComponent({ items }) {
  const handleItemClick = useCallback((itemId) => {
    // Gérer le clic sur un élément de la liste
  }, []);

  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => handleItemClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}
// En résumé, useCallback est utilisé pour mémoriser des fonctions et les rendre stables entre les rendus de composants. Cela peut aider à améliorer les performances en évitant la création excessive de fonctions et en garantissant que les effets et les composants enfants fonctionnent correctement avec les dépendances.