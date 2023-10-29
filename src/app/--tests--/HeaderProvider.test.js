import React from 'react';
import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';

import { HeaderProvider } from '../context/headercontext'; // Assurez-vous d'importer correctement vos composants depuis le fichier source

// Mock de la fonction useState pour qu'elle retourne des valeurs spécifiques
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useState: jest.fn(),
  };
});

describe('HeaderProvider', () => {
  it('renders without crashing', () => {
    // Simuler l'état initial des hooks useState
    React.useState.mockReturnValueOnce([false, jest.fn()]); // isMenuOpen
    React.useState.mockReturnValueOnce([false, jest.fn()]); // burgerActive
    React.useState.mockReturnValueOnce([true, jest.fn()]);  // isNavOpen

    // Rendre le composant HeaderProvider dans un contexte de test
    render(
      <HeaderProvider>
        <div className="menu-container">Menu</div>
      </HeaderProvider>
    );

    // Effectuer des assertions sur le rendu du composant si nécessaire
    // Par exemple, vous pouvez vérifier la présence de certains éléments HTML
    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  it('toggles menu when clicking outside', () => {
    // Simuler l'état initial des hooks useState
    const setIsMenuOpen = jest.fn();
    React.useState.mockReturnValueOnce([true, setIsMenuOpen]); // isMenuOpen
    React.useState.mockReturnValueOnce([false, jest.fn()]);    // burgerActive
    React.useState.mockReturnValueOnce([true, jest.fn()]);     // isNavOpen

    // Rendre le composant HeaderProvider dans un contexte de test
    render(
      <HeaderProvider>
        <div className="menu-container">Menu</div>
      </HeaderProvider>
    );

    // Simuler un clic en dehors du menu
    fireEvent.mouseDown(document.body);

    // Vérifier que setIsMenuOpen a été appelé pour fermer le menu
    expect(setIsMenuOpen).toHaveBeenCalledWith(false);
  });

  // Vous pouvez ajouter d'autres tests pour les autres fonctionnalités de HeaderProvider
});

