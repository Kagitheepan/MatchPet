const React = require('react');

const MockIcon = React.forwardRef((props, ref) => {
  const { size, color, strokeWidth, ...rest } = props;
  return React.createElement('span', { ...rest, ref, 'data-testid': 'mock-icon' });
});
MockIcon.displayName = 'MockIcon';

module.exports = new Proxy({}, {
  get: () => MockIcon
});
