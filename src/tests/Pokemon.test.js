import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente Pokemon', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe('Electric');

    const averageWeight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(averageWeight).toBeInTheDocument();

    const pokemonImage = screen.getByRole('img', { name: /pikachu sprite/i });
    const IMAGE_URL = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';
    expect(pokemonImage.src).toBe(IMAGE_URL);
    expect(pokemonImage.alt).toBe('Pikachu sprite');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink.href).toBe('http://localhost/pokemon/25');
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const navigation = renderWithRouter(<App />);
    const linkToPokemonDetails = screen.getByRole('link', { name: /more details/i });

    expect(linkToPokemonDetails).toBeInTheDocument();

    userEvent.click(linkToPokemonDetails);

    const { history: { location } } = navigation;
    expect(location.pathname).toBe('/pokemon/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémon favoritados:', async () => {
    const { history } = renderWithRouter(<App />);
    const URL_POKEMON = '/pokemon/25';
    history.push(URL_POKEMON);

    const { location } = history;
    expect(location.pathname).toBe(URL_POKEMON);

    const isFavorite = await screen.findByLabelText(/pokémon favoritado\?/i);
    expect(isFavorite).toBeInTheDocument();

    // expect(screen.getByRole('img', { name: /pikachu is marked as favorite/i })).not.toBeInTheDocument();

    userEvent.click(isFavorite);
    expect(isFavorite.checked).toBe(true);

    const favoriteStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favoriteStar).toBeInTheDocument();
    expect(favoriteStar.src).toBe('http://localhost/star-icon.svg');
    expect(favoriteStar.alt).toBe('Pikachu is marked as favorite');
  });
});
