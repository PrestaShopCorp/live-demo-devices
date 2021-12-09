import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import DemoHeader from '@/components/DemoHeader.vue';
import HeaderSwitch from '@/components/HeaderSwitch.vue';
import store from '@/store';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('App.vue', () => {
  it('renders all sub components', () => {
    const wrapper = shallowMount(App, {
      store: new Vuex.Store(store),
      localVue,
    });
    expect(wrapper.find(DemoHeader).is(DemoHeader)).toBe(true);
    expect(wrapper.find(HeaderSwitch).is(HeaderSwitch)).toBe(true);
  });
});
