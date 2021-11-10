import apiClient, { questionsURL } from '../apiClient'

// Create a new question (for admins only).
export const createQuestion = (data) => {
  return apiClient().post(`${questionsURL}/questions`, JSON.stringify(data))
}

// Get all questions.
export const getQuestions = () => {
  return apiClient().get(`${questionsURL}/questions`, JSON.stringify())
}

// Get a random question of a given difficulty.
export const getQuestionOfDifficulty = (difficulty) => {
  return apiClient().get(`${questionsURL}/questions/random/${difficulty}`)
}

// Get a question with the given ID.
export const getQuestion = (id) => {
  return apiClient().get(`${questionsURL}/questions/${id}`)
}
