import Vue from 'vue';
import Router from 'vue-router';
import Shop from './components/Shop.vue';
import i18n from './i18n';

Vue.use(Router);

const defaultUri = `/${i18n.fallbackLocale}/front`;

export default new Router({
  routes: [{
    // Covers all routes to redirect to the default one
    path: '*',
    beforeEnter(to, from, next) {
      return next(defaultUri);
    },
  },
  {
    path: '/:lang/:view',
    component: Shop,
    props: true,
    beforeEnter(to, from, next) {
      const { lang, view } = to.params;
      if (i18n.locale !== lang) {
        i18n.locale = lang;
      }
      // eslint-disable-next-line no-console
      console.log('Router idmodule: ', to.query.idmodule);
      console.log('Router to.query: ', to.query);
      if (!Object.prototype.hasOwnProperty.call(to.query, 'module_name_toinstall')) {
        const newQuery = Object.assign({}, to.query, { module_name_toinstall: 'ALL' });
        return next({ path: defaultUri, query: newQuery });
      }
      // If BO or FO view is not valid, reset
      if (!['back', 'front'].includes(view)) {
        return next({ path: defaultUri, query: to.query });
      }
      return next();
    },
  },
  ],
});
