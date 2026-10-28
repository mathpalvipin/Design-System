import axe from 'axe-core';

export async function getA11yViolations(container: HTMLElement) {
  const results = await axe.run(container, {
    rules: { 'color-contrast': { enabled: false } }, // jsdom can't compute colors
  });
  return results.violations;
}