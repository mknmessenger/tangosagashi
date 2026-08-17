import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('starts a small game without horizontal overflow', async ({ page }) => {
  await page.getByRole('button', { name: 'ゲームスタート' }).click();
  await expect(page.getByRole('gridcell')).toHaveCount(64);
  await expect(page.getByText('0 / 4')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('opens settings and confirms before resetting the record', async ({ page }) => {
  await page.getByRole('button', { name: 'せってい' }).click();
  await page.getByRole('button', { name: 'きろくを けす' }).click();
  await expect(page.getByRole('dialog', { name: 'あつめた きろくを けす？' })).toBeVisible();
  await page.getByRole('button', { name: 'けさない' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('finds a target by dragging and resumes after reload', async ({ page }) => {
  await page.getByRole('button', { name: 'ゲームスタート' }).click();
  const path = await page.evaluate(() => {
    const cells = [...document.querySelectorAll<HTMLElement>('[data-cell]')].map(
      (cell) => cell.textContent ?? '',
    );
    const displayName = document.querySelector('.target-list li')?.textContent ?? '';
    const smallToLarge: Record<string, string> = {
      ァ: 'ア',
      ィ: 'イ',
      ゥ: 'ウ',
      ェ: 'エ',
      ォ: 'オ',
      ッ: 'ツ',
      ャ: 'ヤ',
      ュ: 'ユ',
      ョ: 'ヨ',
    };
    const word = [...displayName].map((character) => smallToLarge[character] ?? character).join('');
    const size = Math.sqrt(cells.length);
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];
    for (let start = 0; start < cells.length; start += 1) {
      const startRow = Math.floor(start / size);
      const startColumn = start % size;
      for (const [rowStep, columnStep] of directions) {
        const candidate = [...word]
          .map((_, index) => {
            const row = startRow + rowStep * index;
            const column = startColumn + columnStep * index;
            return row >= 0 && row < size && column >= 0 && column < size
              ? cells[row * size + column]
              : '';
          })
          .join('');
        if (candidate === word) {
          return {
            start,
            end:
              (startRow + rowStep * (word.length - 1)) * size +
              startColumn +
              columnStep * (word.length - 1),
          };
        }
      }
    }
    throw new Error(`Target not found: ${displayName}`);
  });

  const startBox = await page.getByRole('gridcell').nth(path.start).boundingBox();
  const endBox = await page.getByRole('gridcell').nth(path.end).boundingBox();
  if (!startBox || !endBox) throw new Error('Grid cell is not visible');
  await page.mouse.move(startBox.x + startBox.width / 2, startBox.y + startBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(endBox.x + endBox.width / 2, endBox.y + endBox.height / 2, { steps: 5 });
  await page.mouse.up();

  await expect(page.getByText('1 / 4')).toBeVisible();
  await page.reload();
  await expect(page.getByText('1 / 4')).toBeVisible();
});
