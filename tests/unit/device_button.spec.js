import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import DeviceButton from '@/components/DeviceButton.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('DeviceButton.vue', () => {
  it('renders props when passed', () => {
    const icon = '&#xE30C;';
    const deviceTrigger = 'desktop';
    const wrapper = shallowMount(DeviceButton, {
      propsData: { deviceTrigger, icon },
      store: new Vuex.Store({}),
      localVue,
    });
    expect(wrapper.find('.change-device').classes(deviceTrigger)).toBe(true);
    // Check icon value is not escaped.
    expect(wrapper.find('.material-icons').html()).toBe('<i class="material-icons"></i>');
  });

  it('is active when state matches', () => {
    const icon = '';
    const deviceTrigger = 'desktop';
    const wrapper = shallowMount(DeviceButton, {
      propsData: { deviceTrigger, icon },
      store: new Vuex.Store(
        {
          state: {
            device: 'desktop',
          },
        },
      ),
      localVue,
    });
    expect(wrapper.find('.change-device').classes(deviceTrigger)).toBe(true);
    expect(wrapper.find('.change-device').classes('active')).toBe(true);
  });

  it('is not active when current device is different', () => {
    const icon = '';
    const deviceTrigger = 'tablet';
    const wrapper = shallowMount(DeviceButton, {
      propsData: { deviceTrigger, icon },
      store: new Vuex.Store(
        {
          state: {
            device: 'mobile',
          },
        },
      ),
      localVue,
    });
    expect(wrapper.find('.change-device').classes(deviceTrigger)).toBe(true);
    expect(wrapper.find('.change-device').classes('active')).toBe(false);
  });
});
