import { beforeEach, describe, expect, it } from 'vitest';
import { DEFAULT_STORED_STATE, loadStoredState, saveStoredState } from './gameStorage';

describe('gameStorage', () => {
  beforeEach(() => localStorage.clear());

  it('falls back safely when stored JSON is broken', () => {
    localStorage.setItem('tangosagashi:v1', '{broken');
    expect(loadStoredState()).toEqual(DEFAULT_STORED_STATE);
  });

  it('round-trips settings and the total count', () => {
    saveStoredState({
      version: 1,
      settings: { difficulty: 'normal', preset: 'large', soundEnabled: false },
      totalFound: 12,
      activeGame: null,
    });
    expect(loadStoredState()).toMatchObject({
      settings: { difficulty: 'normal', preset: 'large', soundEnabled: false },
      totalFound: 12,
    });
  });
});
