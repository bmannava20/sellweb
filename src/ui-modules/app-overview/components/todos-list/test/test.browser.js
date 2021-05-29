'use strict';
const expect = require('chai').expect;
const mockData = require('../mock-data/data.json');
const template = require('../');

function buildWidget(data) {
    return template
        .renderSync({ model: data })
        .appendTo(document.body)
        .getComponent();
}

describe('TodoList module', () => {
    describe('when component is rendered with no data', () => {
        let widget;
        let root;
        beforeEach(() => {
            widget = buildWidget({});
            root = document.querySelector('.todo-list');
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('should be empty because data is empty', () => {
            expect(root).to.be.null;
        });
    });

    describe('when the component is rendered with data from the BE', () => {
        let widget;
        let root;
        beforeEach(() => {
            widget = buildWidget(mockData);
            root = document.querySelector('.todo-list');
        });

        afterEach(() => {
            widget.destroy();
        });

        it('should render the list of todos with status as SUCCESS_SHOW_CONTENT', () => {
            expect(root).to.be.not.null;
            const successTodos = mockData.todos.filter(todo => todo.contentStatus.status === 'SUCCESS_SHOW_CONTENT');
            const todoListEl = root.querySelectorAll('.todo-list-item');
            expect(todoListEl.length).to.be.equal(successTodos.length);

            // get any random todo to verify the content being displayed.
            const firstTodo = successTodos[0];
            expect(todoListEl[0].querySelector('.todo-list-item-count').textContent).to.equal(firstTodo.count.value.toString());
            expect(todoListEl[0].querySelector('.todo-list-item-label').textContent).to.equal(firstTodo.label.textSpans[0].text.toString());
        });
    });
});
