import "reflect-metadata";
import { expect } from "chai";
import Sinon from "sinon";
import TodoController from "@http/Controllers/todo-controller";

describe("Todo", function () {
    it("should create todo", async function () {
        const todoController = new TodoController();
        const todoSpy = Sinon.spy(todoController, "create");
        const request = {
            body: {
                userId: "0e87ddc0-a1c2-459a-864a-6d3e60db2624",
                title: "todo todo tooodoo todo todo",
                description: "kuch bhi",
                completed: false
            }
        };
        const response = await todoController.create(request);
        expect(todoSpy.calledOnce).to.be.true;
        expect(response).to.be.an("object");
        expect(response).to.have.property("todoId");
        expect(response).to.have.property("title");
    });
});
