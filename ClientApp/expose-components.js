import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import RootComponent from './src/App';
import { ServerStyleSheets } from '@material-ui/core/styles';
import Helmet from 'react-helmet';

global.React = React;
global.ReactDOM = ReactDOM;
global.ReactDOMServer = ReactDOMServer;

global.MaterialUI = { ServerStyleSheets }
global.Helmet = Helmet;

global.Components = { RootComponent };
