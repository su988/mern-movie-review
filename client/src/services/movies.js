import axios from 'axios';

const url = 'http://localhost:5000/api/v1/movies';

class MovieDataService {
  getAll(page = 0) {
    return axios.get(`${url}?page=${page}`);
  }

  get(id) {
    return axios.get(`${url}/id/${id}`);
  }

  find(query, by = 'title', page = 0) {
    return axios.get(`${url}?${by}=${query}&page=${page}`);
  }

  createReview(data) {
    return axios.post(`${url}/review`, data);
  }

  updateReview(data) {
    return axios.put(`${url}/review`, data);
  }

  deleteReview(id, userId) {
    return axios.delete(`${url}/review`, {
      data: { review_id: id, user_id: userId },
    });
  }
}

export default new MovieDataService();
