/* eslint-disable no-unused-vars */
export async function fetchRegions() {
  return [];
}

export async function fetchCategories() {
  return [];
}

export async function fetchRestaurants() {
  return [];
}

export async function fetchRestaurant({ restaurantId }) {
  return {};
}

export async function postLogin({ email, password }) {
  return 'TOKEN';
}

export async function postReview({
  accessToken, restaurantId, score, description,
}) {
  return {};
}