import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import DemoHeader from '@/components/DemoHeader.vue';
import DeviceButton from '@/components/DeviceButton.vue';
import store from '@/store';
import i18n from '@/i18n';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('DemoHeader.vue', () => {
  it('renders the four devices and BO button', () => {
    const wrapper = shallowMount(DemoHeader, {
      store: new Vuex.Store(store),
      localVue,
      i18n,
    });
    const devices = wrapper.findAll(DeviceButton);
    expect(devices.length).toBe(4);
    devices.wrappers.forEach((element) => expect(element.is(DeviceButton)).toBe(true));

    expect(wrapper.find('.btn-explore-bo').isVisible()).toBe(true);
    // expect(wrapper.find('.btn-explore-front').isVisible()).toBe(false);
  });

  it('hides itself with no_ui option', () => {
    const wrapper = shallowMount(DemoHeader, {
      store: new Vuex.Store({
        ...store,
        state: {
          ...store.state,
          displayUI: false,
        },
      }),
      localVue,
      i18n,
    });
    expect(wrapper.find('#header').isVisible()).toBe(false);
  });
});
