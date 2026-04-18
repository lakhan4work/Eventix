export const API_PATHS = {
  AUTH: {
    REGISTER: '/api/users/register',
    LOGIN: '/api/users/login',
    PROFILE: '/api/users/profile',
  },
  EVENT: {
    CREATE_EVENT: '/api/events',
    GET_ALL_EVENTS: '/api/events/all',
    GET_EVENTS_BY_ORGANIZER: '/api/events/organizer',
    EVENT_BY_ID: (eventID) => `/api/events/${eventID}`,
  },
  BOOKING: {
    CREATE_BOOKING: (eventID) => `/api/bookings/${eventID}`,
    GET_BOOKINGS: '/api/bookings/',
    BOOKING_BY_ID: (bookingID) => `/api/bookings/${bookingID}`,
  },
};
