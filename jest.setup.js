import '@testing-library/jest-dom'
import React from 'react'

// Mock de Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
  usePathname: () => '',
}))

// Mock de Framer Motion robuste pour supprimer TOUS les warnings sur les props DOM
jest.mock('framer-motion', () => {
  const motionProps = [
    'animate', 'initial', 'exit', 'transition', 'variants', 
    'drag', 'dragConstraints', 'onDragEnd', 'whileHover', 
    'whileTap', 'viewport', 'layout', 'style', 'onAnimationStart', 'onAnimationComplete'
  ];

  const ActualSmartMock = (tag) => React.forwardRef(({ children, ...props }, ref) => {
    // Filtrage dynamique des props spécifiques à Framer Motion
    const filteredProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !motionProps.includes(key))
    );
    return React.createElement(tag, { ...filteredProps, ref }, children);
  });

  return {
    motion: new Proxy({}, {
      get: (_, tag) => ActualSmartMock(tag)
    }),
    AnimatePresence: ({ children }) => <>{children}</>,
  };
})

// Mock de Three.js
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="mock-canvas">{children}</div>,
  useFrame: jest.fn(),
  useThree: () => ({}),
}))

jest.mock('@react-three/drei', () => {
  const useGLTF = () => ({
    nodes: {},
    materials: {},
    animations: [],
  });
  useGLTF.preload = jest.fn();
  
  return {
    useGLTF,
    PerspectiveCamera: () => null,
    OrbitControls: () => null,
    Stage: ({ children }) => <div data-testid="mock-stage">{children}</div>,
  };
})

// Mock global de DesktopScene
jest.mock('@/components/3d/DesktopScene', () => {
  return function MockDesktopScene() {
    return <div data-testid="desktop-scene-mock" />;
  };
});
