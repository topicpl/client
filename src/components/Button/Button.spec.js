import React from 'react';
import renderer from 'react-test-renderer';
import Button from './Button';
 
describe('Button', () => {
  test('should match snapshot', () => {
    const component = renderer.create(<Button id="testid">my button</Button>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});