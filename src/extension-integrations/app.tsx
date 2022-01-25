import {ROUTES} from './routes';

let isSet = false;
setInterval(() => {
  const route = ROUTES.find(
      (value) => value.rules.some((rule) => {
        return rule.test(location.href);
      },
      ));
  if (route && !isSet) {
    require(`./integrations/${route.integration}`);
    isSet = true;
  }
  // else {
  //   throw Error('Integration route not found for this url location');
  // }
}, 1000);
