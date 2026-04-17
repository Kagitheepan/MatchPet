import React from 'react';

const MockComponent = React.forwardRef(({ children, ...props }, ref) => {
  // Remove motion-specific props to avoid React warnings
  const { 
    animate, initial, exit, transition, variants, 
    drag, dragConstraints, onDragEnd, whileHover, 
    whileTap, viewport, layout, ...rest 
  } = props;
  return React.createElement('div', { ...rest, ref }, children);
});
MockComponent.displayName = 'FramerMotionMock';

module.exports = {
  motion: {
    div: MockComponent,
    span: MockComponent,
    h1: MockComponent,
    h2: MockComponent,
    p: MockComponent,
    section: MockComponent,
    button: MockComponent,
    img: MockComponent,
    nav: MockComponent,
  },
  AnimatePresence: ({ children }) => children,
};
