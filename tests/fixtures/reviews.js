/**
 * Fixtures for review tests
 */

const validReview = {
  user_id: 1,
  business_id: 1,
  service_id: 1,
  booking_id: 1,
  rating: 5,
  comment: 'Excellent service! Very professional and friendly staff.'
};

const validReviewUpdate = {
  rating: 4,
  comment: 'Good service, but could be better.'
};

const invalidReviews = [
  {
    // Missing user_id
    business_id: 1,
    service_id: 1,
    rating: 5,
    comment: 'Great service!'
  },
  {
    user_id: 1,
    business_id: 1,
    service_id: 1,
    // Invalid rating (too high)
    rating: 6,
    comment: 'Great service!'
  },
  {
    user_id: 1,
    business_id: 1,
    service_id: 1,
    // Invalid rating (too low)
    rating: 0,
    comment: 'Bad service!'
  },
  {
    user_id: 1,
    business_id: 1,
    service_id: 1,
    rating: 5
    // Missing comment (if required)
  }
];

const reviewRatings = [1, 2, 3, 4, 5];

const sampleReviews = [
  {
    id: 1,
    user_id: 1,
    business_id: 1,
    service_id: 1,
    rating: 5,
    comment: 'Amazing experience! Will definitely come back.',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    user_id: 2,
    business_id: 1,
    service_id: 2,
    rating: 4,
    comment: 'Very good service, professional staff.',
    created_at: '2024-01-16T14:00:00Z'
  },
  {
    id: 3,
    user_id: 3,
    business_id: 1,
    service_id: 1,
    rating: 3,
    comment: 'Average service, nothing special.',
    created_at: '2024-01-17T16:00:00Z'
  }
];

const reviewStats = {
  average_rating: 4.0,
  total_reviews: 3,
  rating_distribution: {
    5: 1,
    4: 1,
    3: 1,
    2: 0,
    1: 0
  }
};

module.exports = {
  validReview,
  validReviewUpdate,
  invalidReviews,
  reviewRatings,
  sampleReviews,
  reviewStats
};
