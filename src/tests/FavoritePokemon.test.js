import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Verifica o funcionamento da página de favoritos', () => {
  test('Testa se ao entrar na página de favoritos pela primeira vez, a mensagem No favorite pokemon found aparece:', () => {
    renderWithRouter(<FavoritePokemon />);

    const notFoundMessage = screen.getByText(/no favorite pokémon found/i);

    expect(notFoundMessage).toBeInTheDocument();
  });

  test('Teste se apenas são exibidos os Pokémon favoritados', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemon/65');

    const { location } = history;
    expect(location.pathname).toBe('/pokemon/65');

    const isFavorite = await screen.findByLabelText(/pokémon favoritado\?/i);
    expect(isFavorite).toBeInTheDocument();

    userEvent.click(isFavorite);
    expect(isFavorite.checked).toBe(true);

    const favoriteStar = screen.getByRole('img', { name: /alakazam is marked as favorite/i });
    expect(favoriteStar).toBeInTheDocument();

    const linkToFavorite = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(linkToFavorite);

    const pokemonName = await screen.findByText(/alakazam/i);
    expect(pokemonName).toBeInTheDocument();
  });
});
