const chai = require('chai');
const sinon = require('sinon');
const Todo = require('../models/todo.model');
const todoService = require('../services/todo.service');

const { expect } = chai;

describe('Todo Service Tests', function () {
    let findStub, findByIdStub, saveStub, updateOneStub, deleteOneStub;

    beforeEach(function () {
        findStub = sinon.stub(Todo, 'find');
        findByIdStub = sinon.stub(Todo, 'findById');
        saveStub = sinon.stub(Todo.prototype, 'save');
        updateOneStub = sinon.stub(Todo, 'updateOne');
        deleteOneStub = sinon.stub(Todo, 'deleteOne');
    });

    afterEach(function () {
        sinon.restore();
    });

    describe('getAllTodos', function () {
        it('should return all todos', async function () {
            const mockTodos = [{ id: 1, title: 'Test Todo' }];
            findStub.resolves(mockTodos);

            const todos = await todoService.getAllTodos();
            expect(todos).to.deep.equal(mockTodos);
        });

        it('should throw an error if Todo.find fails', async function () {
            findStub.rejects(new Error('Database error'));

            try {
                await todoService.getAllTodos();
                throw new Error('Expected error was not thrown');
            } catch (error) {
                expect(error.message).to.equal('Internal server error');
            }
        });
    });

    describe('getTodoById', function () {
        it('should return a todo by ID', async function () {
            const mockTodo = { id: 1, title: 'Test Todo' };
            findByIdStub.resolves(mockTodo);

            const todo = await todoService.getTodoById(1);
            expect(todo).to.deep.equal(mockTodo);
        });

        it("should throw an error if the todo is not found", async function () {
            findByIdStub.resolves(null);
            try {
              await todoService.getTodoById(1);
              throw new Error("Expected error was not thrown");
            } catch (error) {
              expect(error.message).to.equal("Todo not found");
            }
        });
          

        it('should throw an error if Todo.findById fails', async function () {
            findByIdStub.rejects(new Error('Database error'));

            try {
                await todoService.getTodoById(1);
                throw new Error('Expected error was not thrown');
            } catch (error) {
                expect(error.message).to.equal('Internal server error');
            }
        });
    });

    describe('createTodo', function () {
        it("should create a new todo", async function () {
            saveStub.resolves({
              title: "Test Todo",
              description: "Test Description",
            });
          
            const todo = await todoService.createTodo("Test Todo", "Test Description");

            expect(todo).to.include({
              title: "Test Todo",
              description: "Test Description",
            });
          });
          

        it('should throw an error if save fails', async function () {
            saveStub.rejects(new Error('Database error'));

            try {
                await todoService.createTodo('Test Todo', 'Test Description');
                throw new Error('Expected error was not thrown');
            } catch (error) {
                expect(error.message).to.equal('Internal server error');
            }
        });
    });

    describe('editTodo', function () {
        it('should edit a todo by ID', async function () {
            const mockTodo = { title: 'Updated Todo' };
            findByIdStub.onFirstCall().resolves(mockTodo);
            updateOneStub.resolves();
            findByIdStub.onSecondCall().resolves(mockTodo);

            const updatedTodo = await todoService.editTodo(1, { title: 'Updated Todo' });
            expect(updatedTodo).to.include(mockTodo);
        });

        it("should throw an error if the todo is not found", async function () {
            findByIdStub.resolves(null);
            try {
              await todoService.editTodo(1, { title: "Updated Todo" });
              throw new Error("Expected error was not thrown");
            } catch (error) {
              expect(error.message).to.equal("Todo not found");
            }
          });
          

        it('should throw an error if updateOne fails', async function () {
            findByIdStub.resolves({ id: 1, title: 'Test Todo' });
            updateOneStub.rejects(new Error('Database error'));

            try {
                await todoService.editTodo(1, { title: 'Updated Todo' });
                throw new Error('Expected error was not thrown');
            } catch (error) {
                expect(error.message).to.equal('Internal server error');
            }
        });
    });

    describe('deleteTodo', function () {
        it('should delete a todo by ID', async function () {
            deleteOneStub.resolves();

            const result = await todoService.deleteTodo(1);
            expect(result).to.deep.equal({ message: 'id 1 successfully deleted' });
        });

        it('should throw an error if deleteOne fails', async function () {
            deleteOneStub.rejects(new Error('Database error'));

            try {
                await todoService.deleteTodo(1);
                throw new Error('Expected error was not thrown');
            } catch (error) {
                expect(error.message).to.equal('Internal server error');
            }
        });
    });
});

