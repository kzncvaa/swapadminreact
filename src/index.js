import React, { Fragment } from "react";
import Dashboard from "./Components/Dashboard";
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);


function App() {
  return (
    <Fragment>
      <Dashboard />
    </Fragment>
  );
}

