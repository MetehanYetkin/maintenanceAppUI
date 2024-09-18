import axios from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: 'http://localhost:5001/api/Auth/Login',
    login: 'http://localhost:5001/api/Auth/Login',
    register: '/api/auth/register',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  user: {
    create: 'http://localhost:5001/api/User',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  invoince: {
    create: 'http://localhost:5001/api/Form/InsertForm',
    details: `http://localhost:5001/api/Form/GetFormById`,
    search: '/api/product/search',
    list:'http://localhost:5001/api/Form/GetAllForm'
  },
  firm: {
    create: 'http://localhost:5001/api/Firm/InsertFirm',
    getall:'http://localhost:5001/api/Firm/GetAllFirms',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};