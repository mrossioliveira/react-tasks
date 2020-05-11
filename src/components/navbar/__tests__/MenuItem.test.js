/*global jest, it, expect, beforeEach, afterEach*/
/*eslint no-undef: "error"*/

import React from 'react';
import ReactDOM, { render, unmountComponentAtNode } from 'react-dom';
import MenuItem from '../MenuItem';
import renderer from 'react-test-renderer';

const IMPORTANT_LIST_ID = -1;
const DEFAULT_LIST_ID = -2;

jest.mock('react-router-dom', () => {
  const DEFAULT_LIST_PATHNAME = 'tasks/default';
  return {
    useHistory: () => ({
      push: jest.fn(),
      location: {
        pathname: DEFAULT_LIST_PATHNAME,
      },
    }),
  };
});

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MenuItem id={1} title="secret" counter={42} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should render correctly', () => {
  render(<MenuItem id={1} title="secret" counter={42} />, container);
  expect(container).toHaveTextContent('secret');
  expect(container).toHaveTextContent('42');
});

it('matches snapshot', () => {
  const component = renderer.create(
    <MenuItem id={1} title="secret" counter={42} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should have item class', () => {
  render(
    <MenuItem id={IMPORTANT_LIST_ID} title="secret" counter={42} />,
    container
  );
  const element = container.firstChild;
  expect(element).toHaveClass('item');
  expect(element).not.toHaveClass('item-selected');
});

it('should have item-selected class', () => {
  render(
    <MenuItem id={DEFAULT_LIST_ID} title="secret" counter={42} />,
    container
  );
  const element = container.firstChild;
  expect(element).toHaveClass('item-selected item');
});

it('should have the correct title', () => {
  render(
    <MenuItem id={DEFAULT_LIST_ID} title="secret" counter={42} />,
    container
  );
  const element = container.firstChild;
  expect(element).toHaveTextContent('secret');
});

it('should have the circle icon when list = Tasks', () => {
  render(
    <MenuItem id={DEFAULT_LIST_ID} title="secret" counter={42} />,
    container
  );
  const element = container.firstChild;
  const icon = element.firstChild.firstChild;
  expect(icon).toHaveClass('fa-circle');
});

it('should have the star icon when list = Important', () => {
  render(
    <MenuItem id={IMPORTANT_LIST_ID} title="secret" counter={42} />,
    container
  );
  const element = container.firstChild;
  const icon = element.firstChild.firstChild;
  expect(icon).toHaveClass('fa-star');
});
