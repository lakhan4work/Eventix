import { axiosInstance } from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

const createEvent = async (eventDetails) => {
  try {
    const response = await axiosInstance.post(API_PATHS.EVENT.CREATE_EVENT, {...eventDetails});

    return response.data;
  } catch (error) {
    throw error.data || { error: 'An unknown error occurred' };
  }
}; 

const getAllEvents = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.EVENT.GET_ALL_EVENTS);

    return response.data;
  } catch (error) {
    throw error.data || { error: 'An unknown error occurred' };
  }
}; 

const getEventByOrganizer = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.GET_EVENTS_BY_ORGANIZER);

    return response.data;
  } catch (error) {
    throw error.data || { error: 'An unknown error occurred' };
  }
}; 

const getEventById = async (id) => {
  try {
    const response = await axiosInstance.get(API_PATHS.EVENT.EVENT_BY_ID(id));

    return response.data;
  } catch (error) {
    throw error.data || { error: 'An unknown error occurred' };
  }
};

const updateEvent = async (id) => {
  try {
    const response = await axiosInstance.put(API_PATHS.EVENT.EVENT_BY_ID(id));

    return response.data;
  } catch (error) {
    throw error.data || { error: 'An unknown error occurred' };
  }
}; 

const deleteEvent = async (id) => {
  try {
    const response = await axiosInstance.delete(API_PATHS.EVENT.EVENT_BY_ID(id));

    return response.data;
  } catch (error) {
    throw error.data || { error: 'An unknown error occurred' };
  }
};

export {createEvent, getAllEvents, getEventById, getEventByOrganizer, updateEvent, deleteEvent}