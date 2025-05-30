import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';


describe('Home Page', () => {
  it('renders the Home heading and the custom button', () => {
    render(<Home />);
    
    // Check that the main text is visible
    expect(screen.getByText('Home')).toBeInTheDocument();

    // Check that the custom Button component is rendered
    expect(screen.getByRole('button', { name: 'Test button' })).toBeInTheDocument();
  });
});

test('simulate CI failure', () => {
  expect(1 + 1).toBe(3); // This will fail
});

