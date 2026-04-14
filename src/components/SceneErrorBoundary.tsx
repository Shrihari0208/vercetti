import React, { Component } from 'react';
import type { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class SceneErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error in 3D Scene:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="absolute inset-0 flex items-center justify-center bg-[#06000f] text-brand-pink text-sm font-lexend p-4 text-center">
          <h2>3D Scene could not be loaded. Please ensure WebGL is enabled.</h2>
        </div>
      );
    }

    return this.props.children;
  }
}
