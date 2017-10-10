import Fluxible from 'fluxible';
import batchedUpdatePlugin from 'fluxible-addons-react/batchedUpdatePlugin';
import AppContainer from './components/App';
import RouteStore from './stores/Route';

const app = new Fluxible({
  component: AppContainer,
  stores: [
    RouteStore,
  ],
});

app.plug(batchedUpdatePlugin());

export default app;
