import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: 'sk-proj-aZ8_2wnOES4vEOs7jajOxTHfB8cKLIgm3ebBXfDMh-RL0JgismbBK3kLS5MMpG5aFJRGXqAkY5T3BlbkFJ8Zm5Z3GKRvw8EvQYoMVJwQAc8GVdr6wZQthE-QYIqC6B6siYi48-UlkRo3O1-M2ciHPijiYiMAFAI'
});

export const openai = new OpenAIApi(configuration);

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const API_ENDPOINTS = {
  inventory: '/inventory',
  orders: '/orders',
  analytics: '/analytics',
  fuel: '/fuel',
  drivers: '/drivers'
};