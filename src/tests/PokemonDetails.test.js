import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const URL_POKEMON = '/pokemon/25';

describe('Testes do componente PokemonDetails', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela:', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(URL_POKEMON);

    const { location } = history;
    expect(location.pathname).toBe(URL_POKEMON);

    const pageTitle = await screen.findByRole('heading', { name: /pikachu details/i });
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Pikachu Details');

    expect(screen.queryByRole('link', { name: /more details/i })).not.toBeInTheDocument();

    const summaryTitle = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summaryTitle.innerHTML).toBe('Summary');

    const summaryText = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(summaryText).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon:', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(URL_POKEMON);

    const locationsTitle = await screen.findByRole('heading', { name: /game locations of pikachu/i });
    expect(locationsTitle.innerHTML).toBe('Game Locations of Pikachu');

    const ALT_TEXT = 'Pikachu location';

    const imageLocations = screen.getAllByAltText(ALT_TEXT);
    const nameLocations = screen.getAllByText(/kanto/i);
    expect(imageLocations).toHaveLength(2);
    expect(nameLocations).toHaveLength(2);

    expect(imageLocations[0].src).toBe('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(imageLocations[0].alt).toBe(ALT_TEXT);
    expect(nameLocations[0].innerHTML).toBe('Kanto Viridian Forest');

    expect(imageLocations[1].src).toBe('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(imageLocations[1].alt).toBe(ALT_TEXT);
    expect(nameLocations[1].innerHTML).toBe('Kanto Power Plant');
  });

  test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes:', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(URL_POKEMON);

    const isFavorite = await screen.findByLabelText(/pokémon favoritado\?/i);
    expect(isFavorite).toBeInTheDocument();
    expect(isFavorite.checked).toBe(false);
    expect(screen.queryByRole('img', { name: /pikachu is marked as favorite/i })).not.toBeInTheDocument();

    userEvent.click(isFavorite);
    expect(isFavorite.checked).toBe(true);
    expect(screen.queryByRole('img', { name: /pikachu is marked as favorite/i })).toBeInTheDocument();

    userEvent.click(isFavorite);
    expect(isFavorite.checked).toBe(false);
    expect(screen.queryByRole('img', { name: /pikachu is marked as favorite/i })).not.toBeInTheDocument();
  });
});
