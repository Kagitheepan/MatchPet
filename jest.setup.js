import '@testing-library/jest-dom'
import React from 'react'

// Mock global fetch
global.fetch = jest.fn();

// Mock localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

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
jest.mock('@/components/3d/DesktopScene', () => ({
  __esModule: true,
  default: function MockDesktopScene() {
    return <div data-testid="desktop-scene-mock" />;
  },
}));
