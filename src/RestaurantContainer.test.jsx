import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import { changeReviewField } from './actions';

import RestaurantContainer from './RestaurantContainer';

import restaurant from '../fixtures/restaurants';

describe('RestaurantContainer', () => {
  const dispatch = jest.fn();

  function renderRestaurantContainer() {
    return render(<RestaurantContainer restaurantId="1" />);
  }

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      restaurant: given.restaurant,
      reviewField: {
        score: '5',
        describe: '맛 좋',
      },
    }));
  });

  it('dispatches action', () => {
    renderRestaurantContainer();

    expect(dispatch).toBeCalled();
  });

  context('with restaurant', () => {
    given('restaurant', () => ({
      id: 1,
      name: '마법사주방',
      address: '서울시 강남구',
    }));

    it('renders name and address', () => {
      const { container } = renderRestaurantContainer();

      expect(container).toHaveTextContent('마법사주방');
      expect(container).toHaveTextContent('서울시');
    });

    it('renders review form', () => {
      const { getByLabelText } = renderRestaurantContainer();

      expect(getByLabelText('평점')).toHaveAttribute('type', 'number');
      expect(getByLabelText('리뷰 내용')).toHaveAttribute('type', 'text');
    });
  });

  context('without restaurant', () => {
    given('restaurant', () => null);

    it('renders loading', () => {
      const { container } = renderRestaurantContainer();

      expect(container).toHaveTextContent('Loading');
    });
  });

  context('when review input changes', () => {
    given('restaurant', () => (restaurant));

    it('changes score', () => {
      const { getByLabelText } = renderRestaurantContainer();

      const controls = [
        { label: '평점', name: 'score', value: '3' },
        { label: '리뷰 내용', name: 'description', value: '맛 좋' },
      ];

      controls.forEach(({ label, name, value }) => {
        fireEvent.change(getByLabelText(label), {
          target: { value },
        });

        expect(dispatch).toBeCalledWith({
          type: 'changeReviewField',
          payload: { name, value },
        });
      });
    });
  });
});
