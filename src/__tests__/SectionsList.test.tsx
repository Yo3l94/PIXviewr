import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SectionsList from './../components/SectionsList';

test('renders sections list', () => {
  const { getByTestId } = render(<SectionsList />);
  const linkElement = getByTestId('thumbnails-wrapper');
  expect(linkElement.childElementCount).toBe(10);
});

test('clicks on a thumbnail and retrieves section details', () => {
  const { getByTestId, queryByText } = render(<SectionsList />)
  const clickableThumbnail = getByTestId(/\bthumbnail\b/)
  fireEvent.click(clickableThumbnail)
  expect(queryByText("Loading...")).not.toBeNull();
})