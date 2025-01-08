import { ModuleFederationConfig } from '@nx/module-federation';

const libsConfig = {
  '@mui/material': { singleton: true, strictVersion: true },
  '@emotion/react': { singleton: true, strictVersion: true },
  '@emotion/styled': { singleton: true, strictVersion: true },
  react: { singleton: true, strictVersion: true },
  'react-dom': { singleton: true, strictVersion: true },
  'react-router-dom': { singleton: true, strictVersion: true }
}

const config: ModuleFederationConfig = {
  name: 'product_listing',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  shared: (libraryName, defaultConfig) => {
    if (libraryName in libsConfig) {
      console.log(`Sharing library: ${libraryName}`);
      return libsConfig[libraryName];
    }
    return false;
  }
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
