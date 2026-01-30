
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("VANTAGE AI: Initializing core systems...");

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Could not find root element");

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("VANTAGE AI: Systems Online.");
} catch (err) {
  console.error("VANTAGE AI: Critical boot failure", err);
}
