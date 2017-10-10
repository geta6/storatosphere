import { fromJS } from 'immutable';
import { RouteStore } from 'fluxible-router';
import IndexHandler from '../../handlers/Index';

const createRouteAction = (action) => async (context, ...args) => {
  const route = args.shift();
  await Promise.all(action(context, fromJS(route), ...args));
};

const routes = RouteStore.withStaticRoutes({
  public: {
    path: '/',
    handler: IndexHandler,
    action: createRouteAction(() => ([])),
  },
});

Object.assign(routes.prototype, {
  getRoute: function getRoute() {
    return fromJS(routes.prototype.getCurrentRoute.call(this) || {});
  },
  getError: function getError() {
    return fromJS(routes.prototype.getCurrentNavigateError.call(this) || {});
  },
});

export default routes;
