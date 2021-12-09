import Vue from 'vue';
import Router from 'vue-router';
import ShopFrame from './components/ShopFrame.vue';
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
    component: ShopFrame,
    props: true,
    beforeEnter(to, from, next) {
      const { lang, view } = to.params;
      if (i18n.locale !== lang) {
        i18n.locale = lang;
      }
      // If BO or FO view is not valid, reset
      if (!['back', 'front'].includes(view)) {
        return next(defaultUri);
      }
      return next();
    },
  },
  ],
});
