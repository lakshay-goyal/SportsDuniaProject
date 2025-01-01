// export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
// export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';

// export const fetchNews = () => {
//   return async dispatch => {
//     try {
//       const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=a19f75d862c24b849a6118d3cecaeb52');
//       if (!response.ok) {
//         throw new Error('Failed to fetch news');
//       }
//       const data = await response.json();
//       const articles = data.articles.map((article, index) => ({
//         id: index,
//         title: article.title,
//         author: article.author || 'Unknown',
//         date: article.publishedAt,
//         type: article.source.name,
//       }));
//       dispatch({ type: FETCH_NEWS_SUCCESS, payload: articles });
//     } catch (error) {
//       console.error('Error fetching news:', error);
//       dispatch({ type: FETCH_NEWS_FAILURE, payload: error.message });
//     }
//   };
// };


import axios from 'axios';

export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';

export const fetchNews = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_NEWS_REQUEST });
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=a19f75d862c24b849a6118d3cecaeb52');
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

