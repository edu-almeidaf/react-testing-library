import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Not Found', () => {
  it('Testa os componentes da página NotFound', () => {
    renderWithRouter(<NotFound />);

    const notFoundMessage = screen.getByRole('heading', { name: /page requested not found/i });
    expect(notFoundMessage).toBeInTheDocument();

    const image = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    const URL_IMAGE = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(URL_IMAGE);
  });
});
