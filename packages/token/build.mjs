import StyleDictionary from 'style-dictionary';

// Light: all tokens (primitives + semantic) go into :root
const light = new StyleDictionary({
  source: ['src/primitives/**/*.json', 'src/themes/light.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [
        {
          destination: 'light.css',
          format: 'css/variables',
          options: { selector: ':root', outputReferences: true },
        },
      ],
    },
  },
});

// Dark: only the semantic overrides, applied when data-theme="dark"
const dark = new StyleDictionary({
  source: ['src/primitives/**/*.json', 'src/themes/dark.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [
        {
          destination: 'dark.css',
          format: 'css/variables',
          filter: (token) => token.filePath.includes('dark'),
          options: { selector: '[data-theme="dark"]' },
        },
      ],
    },
  },
});

await light.buildAllPlatforms();
await dark.buildAllPlatforms();