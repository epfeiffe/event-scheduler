const WARN_JSX_TRANSFORM = 'Your app (or one of its dependencies) is using an outdated JSX transform';

const originalWarn = console.warn;

console.warn = (...args) => {
  if (
    args.length > 0 &&
    typeof args[0] === 'string' &&
    args[0].includes(WARN_JSX_TRANSFORM)
  ) {
    return;
  }
  // Call the original warn if not matching
  originalWarn(...args);
};
