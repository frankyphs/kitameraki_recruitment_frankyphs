import { FETCH_TASKS } from "./actionType";

export const getTasks = (payload) => ({
  type: FETCH_TASKS,
  payload,
});

const baseUrl = "http://localhost:3000";

export const fetchTasks = () => async (dispatch) => {
  try {
    const response = await fetch(`${baseUrl}/tasks`);
    if (!response.ok) {
      throw { name: "error" };
    }
    const jsonData = await response.json();

    dispatch(getTasks(jsonData));
  } catch (err) {
    console.log(err);
  }
};

export const deleteTasks = (id) => async (dispatch) => {
  try {
    const opt = {
      method: "delete",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(`${baseUrl}/tasks/${id}`, opt);
    if (!response.ok) {
      throw { name: "error" };
    }

    dispatch(fetchTasks());
  } catch (error) {
    console.log(error);
  }
};

export const addTask = (payload) => async (dispatch) => {
  try {
    const opt = {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const response = await fetch(`${baseUrl}/tasks`, opt);
    if (!response.ok) {
      throw { name: "error", data: await response.json() };
    }

    dispatch(fetchTasks());
  } catch (err) {
    console.log(err);
  }
};

export const editTask = (id, payload) => async (dispatch) => {
  try {
    const data = {
      title: payload.title,
      description: payload.description,
    };
    const opt = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const response = await fetch(`${baseUrl}/tasks/${id}`, opt);
    if (!response.ok) {
      throw { name: "error", data: await response.json() };
    }

    dispatch(fetchTasks());
  } catch (err) {
    console.log(err);
  }
};
