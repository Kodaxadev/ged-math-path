import type { MathfieldElement } from 'mathlive';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type MathFieldProps = DetailedHTMLProps<HTMLAttributes<MathfieldElement>, MathfieldElement>;

// MathLive registers <math-field> as a custom element; teach JSX about it.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': MathFieldProps;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': MathFieldProps;
    }
  }
}

export {};
