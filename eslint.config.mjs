import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
  // Prebuilt static exports (portfolio demos) are build output, not source.
  {ignores: ['public/demos/**']},
  ...nextVitals,
  ...nextTypescript
];

export default eslintConfig;
