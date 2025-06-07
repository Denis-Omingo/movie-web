import { render, screen, fireEvent, act } from '@testing-library/react';
import MobileMenu from '@/components/Menus/MobileMenu';
import '@testing-library/jest-dom';

const setScreenWidth = async (width: number) => {
  await act(async () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
    window.dispatchEvent(new Event('resize'));
  });
};

describe('MobileMenu', () => {
  afterEach(async () => {
    await setScreenWidth(1024); 
  });

  it('renders on mobile screens (width < 768px)', async () => {
    await setScreenWidth(375);
    render(<MobileMenu />);
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

  it('does not render on desktop screens (width >= 768px)', async () => {
    await setScreenWidth(1024);
    render(<MobileMenu />);
    expect(screen.queryByRole('button', { name: /open menu/i })).not.toBeInTheDocument();
  });

  it('opens the menu and displays nav items when clicked', async () => {
    await setScreenWidth(375);
    render(<MobileMenu />);

    const openButton = screen.getByRole('button', { name: /open menu/i });

    await act(async () => {
      fireEvent.click(openButton);
    });

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });

  it('closes the sheet when a menu item is selected', async () => {
    await setScreenWidth(375);
    render(<MobileMenu />);

    const openButton = screen.getByRole('button', { name: /open menu/i });
    await act(async () => {
      fireEvent.click(openButton);
    });

    const homeLink = screen.getByText(/home/i);
    await act(async () => {
      fireEvent.click(homeLink);
    });
  });
});
