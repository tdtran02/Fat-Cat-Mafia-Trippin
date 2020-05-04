import axios from 'axios';

const env = process.env.NODE_ENV;

export const app = axios.create({
    baseURL:
        env === 'production'
            ? 'http://trippin.website/api/' //production
            : 'http://localhost:4000/', //development
});
