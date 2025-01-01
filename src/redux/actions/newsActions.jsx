import axios from 'axios';

export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';

export const fetchNews = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_NEWS_REQUEST });
    try {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY; // Use import.meta.env for Vite
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
      const articles = response.data.articles.map((article, index) => ({
        id: index,
        title: article.title,
        author: article.author || 'Unknown',
        date: article.publishedAt,
        type: article.source.name,
        description: article.description,
        content: article.content,
        url: article.url,
      }));
      dispatch({ type: FETCH_NEWS_SUCCESS, payload: articles });
    } catch (error) {
      dispatch({ type: FETCH_NEWS_FAILURE, payload: error.message });
    }
  };
};
