import React from 'react';
import { render, mount } from 'enzyme';
import Responsivefy from '../Responsivefy';

const setup = (propOverrides, renderFn = render) => {
  const props = {
    height: 400,
    width: 600,
    margin: undefined,
    ...propOverrides,
  };

  const wrapper = renderFn(
    <Responsivefy {...props}>
      <rect width={100} height={100} y={10} x={12} />
    </Responsivefy>,
  );

  return { props, wrapper };
};

describe('Responsivefy Tests', () => {
  describe('when passed valid props', () => {
    test('it renders and matches snapshot when margins are specified', () => {
      const { wrapper } = setup({
        margin: { top: 20, bottom: 20, right: 20, left: 20 },
      });
      expect(wrapper).toMatchSnapshot();
    });

    test('it renders and matches snapshot when margins are not specified', () => {
      const { wrapper } = setup();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when the componentDidMount event fires', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    test('the resize EventListener is added', () => {
      const globalAddEventListener = global.addEventListener;
      const map = {};
      global.addEventListener = jest.fn().mockImplementation((event, cb) => {
        map[event] = cb;
      });

      setup({}, mount);

      global.addEventListener = globalAddEventListener;

      expect(typeof map.resize).toEqual('function');
    });

    const updateComputedStyleGetter = (value) => {
      const getPropertyValue = jest.fn().mockImplementation(name => value);
      global.getComputedStyle = jest.fn().mockImplementation((node, empty) => ({
        getPropertyValue,
      }));
    };

    test('the resize function fires', () => {
      updateComputedStyleGetter(600);
      const { wrapper } = setup({}, mount);

      const initialWidthFromState = wrapper.state('currentWidth');
      const newWidth = 900;
      global.window.innerWidth = newWidth;
      updateComputedStyleGetter(newWidth);

      global.window.dispatchEvent(new Event('resize'));

      const updatedWidthFromState = wrapper.state('currentWidth');

      expect(initialWidthFromState).not.toEqual(updatedWidthFromState);
      expect(updatedWidthFromState).toEqual(newWidth);
    });
  });

  describe('when the componentWillUnmount event fires', () => {
    afterAll(() => {
      jest.resetAllMocks();
    });

    test('the resize EventListener is removed', () => {
      const globalAddEventListener = global.addEventListener;
      const globalRemoveEventListener = global.removeEventListener;

      const map = {};
      global.addEventListener = jest.fn().mockImplementation((event, cb) => {
        map[event] = cb;
      });
      global.removeEventListener = jest.fn().mockImplementation((event, cb) => {
        map[event] = 'REMOVED';
      });

      const { wrapper } = setup({}, mount);
      wrapper.unmount();

      global.addEventListener = globalAddEventListener;
      global.removeEventListener = globalRemoveEventListener;

      expect(map.resize).toEqual('REMOVED');
    });
  });
});
