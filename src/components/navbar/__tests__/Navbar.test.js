/*global it, afterEach, expect */
/*eslint no-undef: "error"*/
import React from 'react';
import { render, cleanup, listState } from '../../../test-utils';

import Navbar from '../Navbar';

afterEach(cleanup);

it('should render navbar with items', () => {
  const { getByTestId } = render(<Navbar />);
  expect(getByTestId('navbar-items')).toHaveTextContent('Test list');
  // lentgh + 1 for the divider
  expect(getByTestId('navbar-items').children).toHaveLength(
    listState.lists.length + 1
  );
});
