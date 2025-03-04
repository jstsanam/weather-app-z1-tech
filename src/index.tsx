import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import App from './App.tsx';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store} children={undefined}>
      <App />
    </Provider>
);
