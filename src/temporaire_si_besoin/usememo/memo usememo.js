import React, { useMemo } from 'react';

// useMemo est un autre crochet (hook) de la bibliothèque React qui vous permet d'optimiser les performances en mémorisant les résultats de calculs coûteux. Contrairement à useCallback qui mémorise des fonctions, useMemo mémorise les valeurs calculées en fonction des dépendances spécifiées. Cela peut être utile lorsque vous avez des calculs ou des opérations de traitement de données qui peuvent être coûteux en termes de performances.

// Voici quelques exemples d'applications de useMemo :

// Calculs intensifs : Si vous avez des calculs complexes ou des opérations de traitement de données dans vos composants, useMemo peut être utilisé pour mémoriser les résultats de ces calculs, évitant ainsi de les recalculer à chaque rendu.
// jsx

//import React, { useMemo } from 'react';

function ComplexCalculationComponent({ data }) {
  const result = useMemo(() => {
    // Effectuer des calculs intensifs basés sur les données
    return performComplexCalculation(data);
  }, [data]);

  return <div>Résultat: {result}</div>;
}
// Optimisation des rendus conditionnels : Lorsque vous avez des rendus conditionnels basés sur certaines valeurs, useMemo peut être utilisé pour mémoriser les valeurs conditionnelles, évitant ainsi de recalculer ces valeurs à chaque rendu.
// jsx

//import React, { useMemo } from 'react';

function ConditionalRenderingComponent({ condition }) {
  const renderedContent = useMemo(() => {
    if (condition) {
      return <div>Condition est vraie</div>;
    } else {
      return <div>Condition est fausse</div>;
    }
  }, [condition]);

  return <div>{renderedContent}</div>;
}
// Optimisation des listes de composants : Lorsque vous avez des listes de composants et que vous voulez éviter de recalculer les mêmes valeurs pour chaque élément de la liste, useMemo peut être utilisé pour mémoriser ces valeurs.
// jsx

//import React, { useMemo } from 'react';

function ListComponent({ items }) {
  const renderedItems = useMemo(() => {
    return items.map(item => <div key={item.id}>{item.name}</div>);
  }, [items]);

  return <div>{renderedItems}</div>;
}
// En somme, useMemo est utilisé pour optimiser les performances en mémorisant les résultats de calculs ou d'opérations coûteuses. Cela aide à éviter le recalcul fréquent de valeurs et à améliorer l'efficacité des rendus de composants, en particulier lorsque des dépendances spécifiques changent.