const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;
const todoController = require('../controllers/todo.controller');
const todoService = require('../services/todo.service');

describe('Todo Controller Tests', function () {
    let req, res, next;

    beforeEach(function () {
        req = { params: {}, body: {} };
        res = {
            send: sinon.stub(),
            status: sinon.stub().returnsThis()
        };
        next = sinon.stub();

        sinon.stub(todoService, 'getAllTodos');
        sinon.stub(todoService, 'getTodoById');
        sinon.stub(todoService, 'createTodo');
        sinon.stub(todoService, 'editTodo');
        sinon.stub(todoService, 'deleteTodo');
    });

    afterEach(function () {
        sinon.restore();
    });

    describe('getAllTodos', function () {
        it('should fetch all todos and send them in the response', async function () {
            const mockTodos = [{ id: 1, title: 'Test Todo' }];
            todoService.getAllTodos.resolves(mockTodos);

            await todoController.getAllTodos(req, res);

            expect(res.send.calledOnceWith(mockTodos)).to.be.true;
        });

        it('should return a 500 status on failure', async function () {
            todoService.getAllTodos.rejects(new Error('Database error'));

            await todoController.getAllTodos(req, res);

            expect(res.status.calledOnceWith(500)).to.be.true;
            expect(res.send.calledOnceWith({ error: "couldn't fetch all todos" })).to.be.true;
        });
    });

    describe('getTodoById', function () {
        it('should fetch a todo by ID and send it in the response', async function () {
            req.params.id = '1';
            const mockTodo = { id: 1, title: 'Test Todo' };
            todoService.getTodoById.resolves(mockTodo);

            await todoController.getTodoById(req, res);

            expect(res.send.calledOnceWith(mockTodo)).to.be.true;
        });

        it('should return a 404 status if the todo is not found', async function () {
            req.params.id = '1';
            todoService.getTodoById.rejects(new Error('Todo not found'));

            await todoController.getTodoById(req, res);

            expect(res.status.calledOnceWith(404)).to.be.true;
            expect(res.send.calledOnceWith({ error: `Couldn't retrieve a todo with id 1` })).to.be.true;
        });
    });

    describe('createTodo', function () {
        it('should create a new todo and send it in the response', async function () {
            req.body = { title: 'New Todo', description: 'Test Description' };
            const mockTodo = { id: 1, title: 'New Todo', description: 'Test Description' };
            todoService.createTodo.resolves(mockTodo);

            await todoController.createTodo(req, res);

            expect(res.send.calledOnceWith(mockTodo)).to.be.true;
        });

        it('should return a 500 status on failure', async function () {
            req.body = { title: 'New Todo', description: 'Test Description' };
            todoService.createTodo.rejects(new Error('Database error'));

            await todoController.createTodo(req, res);

            expect(res.status.calledOnceWith(500)).to.be.true;
            expect(res.send.calledOnceWith({ error: 'Todo creation failed' })).to.be.true;
        });
    });

    describe('editTodo', function () {
        it('should update a todo and send it in the response', async function () {
            req.params.id = '1';
            req.body = { title: 'Updated Todo' };
            const mockTodo = { id: 1, title: 'Updated Todo' };
            todoService.editTodo.resolves(mockTodo);

            await todoController.editTodo(req, res);

            expect(res.send.calledOnceWith(mockTodo)).to.be.true;
        });

        it('should return a 404 status if the todo is not found', async function () {
            req.params.id = '1';
            req.body = { title: 'Updated Todo' };
            todoService.editTodo.rejects(new Error('Todo not found'));

            await todoController.editTodo(req, res);

            expect(res.status.calledOnceWith(404)).to.be.true;
            expect(res.send.calledOnceWith({ error: "Couldn't update a todo with id 1" })).to.be.true;
        });
    });

    describe('deleteTodo', function () {
        it('should delete a todo and send a success message', async function () {
            req.params.id = '1';
            const mockResponse = { message: 'id 1 successfully deleted' };
            todoService.deleteTodo.resolves(mockResponse);

            await todoController.deleteTodo(req, res);

            expect(res.send.calledOnceWith(mockResponse)).to.be.true;
        });

        it('should return a 404 status if the todo is not found', async function () {
            req.params.id = '1';
            todoService.deleteTodo.rejects(new Error('Todo not found'));

            await todoController.deleteTodo(req, res);

            expect(res.status.calledOnceWith(404)).to.be.true;
            expect(res.send.calledOnceWith({ error: "Couldn't delete a todo with id 1" })).to.be.true;
        });
    });
});
