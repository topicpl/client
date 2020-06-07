import React from 'react';
import Button from './Button';
import { mountWithTheme } from '../../utils/jestHelpers';

describe('Button', () => {
  test('should match variant - default', () => {
    const wrapper = mountWithTheme(<Button>my button</Button>);
    const tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should match variant - success', () => {
    const wrapper = mountWithTheme(<Button variant="success">my button</Button>);
    const tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
