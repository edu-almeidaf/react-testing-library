import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testa os componentes da página About', () => {
  test('Verifica os textos da página About', () => {
    renderWithRouter(<About />);

    const titleEl = screen.getByRole('heading', { name: /about pokédex/i });
    expect(titleEl).toBeInTheDocument();

    const firstParagraph = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText(/one can filter pokémon by type, and see more details for each one of them/i);
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Verifica se o link da imagem está correto', () => {
    renderWithRouter(<About />);
    const IMAGE_URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img', { name: /pokédex/i });

    expect(image.src).toBe(IMAGE_URL);
  });
});
