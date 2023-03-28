import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente Pokédex', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const pageTitle = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(pageTitle).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado:', () => {
    renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    for (let index = 0; index < 4; index += 1) {
      userEvent.click(nextPokemonBtn);
    }

    const pokemonName = screen.getByText(/alakazam/i);
    expect(pokemonName).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez;', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getAllByText(/pikachu/i);
    expect(pokemonName).toHaveLength(1);

    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    for (let index = 0; index < 6; index += 1) {
      userEvent.click(nextPokemonBtn);
    }

    const secondPokemonName = screen.getAllByText(/rapidash/i);
    expect(secondPokemonName).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App />);
    // const pokemonFilters = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const verifyFilterButton = screen.getAllByTestId('pokemon-type-button');
    const verifyAllButton = screen.getByRole('button', { name: /all/i });
    expect(verifyAllButton).toBeInTheDocument();

    userEvent.click(verifyFilterButton[0]);
    const eletricSpecie = screen.getAllByText(/electric/i);
    expect(eletricSpecie).toHaveLength(2);

    userEvent.click(verifyFilterButton[1]);
    const fireSpecie = screen.getAllByText(/fire/i);
    expect(fireSpecie).toHaveLength(2);

    userEvent.click(verifyFilterButton[2]);
    const bugSpecie = screen.getAllByText(/bug/i);
    expect(bugSpecie).toHaveLength(2);

    userEvent.click(verifyFilterButton[3]);
    const poisonSpecie = screen.getAllByText(/poison/i);
    expect(poisonSpecie).toHaveLength(2);

    userEvent.click(verifyFilterButton[4]);
    const psychicSpecie = screen.getAllByText(/psychic/i);
    expect(psychicSpecie).toHaveLength(2);

    userEvent.click(verifyFilterButton[5]);
    const normalSpecie = screen.getAllByText(/normal/i);
    expect(normalSpecie).toHaveLength(2);

    userEvent.click(verifyFilterButton[6]);
    const dragonSpecie = screen.getAllByText(/dragon/i);
    expect(dragonSpecie).toHaveLength(3);

    userEvent.click(verifyAllButton);
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const verifyAllButton = screen.getByRole('button', { name: /all/i });
    expect(verifyAllButton).toBeInTheDocument();
  });

  test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    renderWithRouter(<App />);
    const filterButton = screen.getByRole('button', { name: /poison/i });
    const beforeFilterBtnClick = screen.getAllByText('Poison');
    expect(beforeFilterBtnClick).toHaveLength(1);

    userEvent.click(filterButton);
    const afterFilterBtnClick = screen.getAllByText('Poison');
    expect(afterFilterBtnClick).toHaveLength(2);
  });
});
