interface WebpackModule {
  get(module: string): Promise<() => { default: React.ComponentType }>;
  init(shareScope: unknown): Promise<void>;
  __initialized?: boolean;
}

declare global {
  interface Window {
    checkout?: WebpackModule;
    shop?: WebpackModule;
  }
}

export {};
