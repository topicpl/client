import axios from 'axios';

const serverUrl = 'http://localhost:3000';

export const getRouterRtpCapabilities = (data) => axios.post(`${serverUrl}/signaling/join-as-new-peer`, data).then((res) => res.data);


export const createTransport = (data) => axios.post(`${serverUrl}/signaling/create-transport`, data).then((res) => res.data);

export const connectTransport = (data) => axios.post(`${serverUrl}/signaling/connect-transport`, data).then((res) => res.data);

export const sendTrack = (data) => axios.post(`${serverUrl}/signaling/send-track`, data).then((res) => res.data);

export const receiveTrack = (data) => axios.post(`${serverUrl}/signaling/recv-track`, data).then((res) => res.data);

export const resumeCustomer = (data) => axios.post(`${serverUrl}/signaling/resume-consumer`, data).then((res) => res.data);
