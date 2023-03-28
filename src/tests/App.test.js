import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente App', () => {
  describe('Testes dos links de navegação', () => {
    test('Verifica as funcionalidades do link home', () => {
      const navigation = renderWithRouter(<App />);
      const linkToHome = screen.getByRole('link', { name: /home/i });

      expect(linkToHome).toBeInTheDocument();

      userEvent.click(linkToHome);

      const { history: { location } } = navigation;
      expect(location.pathname).toBe('/');
    });

    test('Verifica as funcionalidades do link About', () => {
      const navigation = renderWithRouter(<App />);
      const linkToAbout = screen.getByRole('link', { name: /about/i });

      expect(linkToAbout).toBeInTheDocument();

      userEvent.click(linkToAbout);

      const { history: { location } } = navigation;
      expect(location.pathname).toBe('/about');
    });

    test('Verifica as funcionalidades do link Favorite Pokémon', () => {
      const navigation = renderWithRouter(<App />);
      const linkToFavPok = screen.getByRole('link', { name: /favorite pokémon/i });

      expect(linkToFavPok).toBeInTheDocument();

      userEvent.click(linkToFavPok);

      const { history: { location } } = navigation;
      expect(location.pathname).toBe('/favorites');
    });
  });

  describe('Testa o componente Not Found', () => {
    it('Mostra a página Not Found caso a rota não seja encontrada:', () => {
      const { history } = renderWithRouter(<App />);
      act(() => {
        history.push('xablau');
      });

      const { location } = history;
      expect(location.pathname).toBe('/xablau');

      const notFoundMessage = screen.getByRole('heading', { name: /page requested not found/i });
      expect(notFoundMessage).toBeInTheDocument();
    });
  });
});
