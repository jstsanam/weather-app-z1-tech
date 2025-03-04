import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import WeatherDashboard from './components/WeatherDashboard.tsx';

function App() {
  return (
    <Provider store={store} children={undefined}>
      <div>
        <WeatherDashboard />
      </div>
    </Provider>
  );
}

export default App;