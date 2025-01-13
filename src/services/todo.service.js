const Todo = require("../models/todo.model");

// Get all todos
const getAllTodos = async () => {
  try {
    const todos = await Todo.find();
    return todos;
  } catch (error) {
    throw new Error("Internal server error");
  }
};

// Get a todo by ID
const getTodoById = async (id) => {
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    return todo;
  } catch (error) {
    if (error.message === "Todo not found") throw error;
    throw new Error("Internal server error");
  }
};


// Create a new todo
const createTodo = async (title, description) => {
  try {
    const todo = new Todo({
      title,
      description,
    });
    await todo.save();
    return {
      id: todo._id,
      title: todo.title,
      description: todo.description,
    };
  } catch (error) {
    throw new Error("Internal server error");
  }
};


// Edit a todo by ID
const editTodo = async (id, updatedData) => {
  try {
    let todo = await Todo.findById(id);
    if (!todo) {
      throw new Error("Todo not found");
    }

    await Todo.updateOne({ _id: id }, { $set: updatedData });

    todo = await Todo.findById(id);
    return {
      id: todo._id,
      title: todo.title,
      description: todo.description,
    };
  } catch (error) {
    if (error.message === "Todo not found") throw error;
    throw new Error("Internal server error");
  }
};


// Edit a todo by ID
const deleteTodo = async (id) => {
  try {
    await Todo.deleteOne({ _id: id });
    return {
      message: `id ${id} successfully deleted`
    }
  } catch (error) {
    throw new Error("Internal server error");
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  editTodo,
  deleteTodo
};
