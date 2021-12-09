import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import HeaderSwitch from '@/components/HeaderSwitch.vue';
import i18n from '@/i18n';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('HeaderSwitch.vue', () => {
  it('renders as shown by default', () => {
    const wrapper = shallowMount(HeaderSwitch, {
      store: new Vuex.Store({
        state: {
          displayHeader: true,
          displayUI: true,
        },
      }),
      localVue,
      i18n,
    });

    expect(wrapper.find('.btn-collapse').classes('collapsed')).toBe(false);
    expect(wrapper.find('.hide-header').isVisible()).toBe(true);
    expect(wrapper.find('.show-header').exists()).toBe(false);
  });

  it('hides when states matches', () => {
    const wrapper = shallowMount(HeaderSwitch, {
      store: new Vuex.Store({
        state: {
          displayHeader: false,
          displayUI: true,
        },
      }),
      localVue,
      i18n,
    });

    expect(wrapper.find('.btn-collapse').classes('collapsed')).toBe(true);
    expect(wrapper.find('.hide-header').exists()).toBe(false);
    expect(wrapper.find('.show-header').isVisible()).toBe(true);
  });
  it('hides itself with no-ui option', () => {
    const wrapper = shallowMount(HeaderSwitch, {
      store: new Vuex.Store({
        state: {
          displayHeader: true,
          displayUI: false,
        },
      }),
      localVue,
      i18n,
    });

    expect(wrapper.find('.btn-collapse').classes('collapsed')).toBe(false);
    expect(wrapper.find('.hide-header').isVisible()).toBe(false);
    expect(wrapper.find('.show-header').exists()).toBe(false);
  });
});
