import { axiosInstance } from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

const createBooking = async (eventId) => {
  try {
    const response = await axiosInstance.post(API_PATHS.BOOKING.CREATE_BOOKING(eventId));

    return response.data;
  } catch (error) {
    throw error.data || { error: 'An unknown error occurred' };
  }
};

const getAllBookings = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.BOOKING.GET_BOOKINGS);

    return response.data;
  } catch (error) {
    throw error.data || { error: 'An unknown error occurred' };
  }
};

const getBookingById = async (id) => {
  try {
    const response = await axiosInstance.get(API_PATHS.BOOKING.BOOKING_BY_ID(id));

    return response.data;
  } catch (error) {
    throw error.data || { error: 'An unknown error occurred' };
  }
};

const deleteBooking = async (id) => {
  try {
    const response = await axiosInstance.delete(API_PATHS.BOOKING.BOOKING_BY_ID(id));

    return response.data;
  } catch (error) {
    throw error.data || { error: 'An unknown error occurred' };
  }
};
