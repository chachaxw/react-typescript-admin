// Global declare
declare global {
  interface Window {
    ga: any;
    WxLogin: any;
  }
}

// Global auth interface
export interface Auth {
  isAuthenticated: boolean;
  permissions: string[];
}
