import {ROUTES} from './routes';

const route = ROUTES.find((value) => value.rule.test(location.href));
if (route) {
  require(`./integrations/${route.integration}`);
} else {
  throw Error('Integration route not found for this url location');
}
