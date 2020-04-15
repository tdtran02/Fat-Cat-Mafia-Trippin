import axios from 'axios';

const env = process.env.NODE_ENV;

export const app = axios.create({
    baseURL:
        env === 'production'
            ? 'http://ec2-3-101-14-234.us-west-1.compute.amazonaws.com/' //production
            : 'http://localhost:4000/', //development
});