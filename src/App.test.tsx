import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);

  it('starts with the approved easy and small defaults', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: 'かんたん' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: /小8×84ひき/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('opens a small game with four targets', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'ゲームスタート' }));
    expect(screen.getAllByRole('gridcell')).toHaveLength(64);
    expect(screen.getByText('0 / 4')).toBeInTheDocument();
    expect(screen.getByRole('list', { name: 'さがすポケモン' }).children).toHaveLength(4);
  });

  it('changes and persists the sound preference', () => {
    const { unmount } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'せってい' }));
    fireEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    unmount();
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'せってい' }));
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });
});
