import expect from "expect";
import sinon from "sinon";
import * as todo from "../src/model/todoModel";
import * as todoServices from "../src/services/todoServices";

describe("Get Todo", () => {
  let idExistsStub: sinon.SinonStub;

  before(() => {
    idExistsStub = sinon.stub(todo, "idExists");
  });

  afterEach(() => {
    idExistsStub.reset();
  });

  after(() => {
    idExistsStub.restore();
  });

  it("getOneTodoService", () => {
    const returnVal = [
      true,
      {
        id: 1,
        userId: 1,
        title: "Hello",
        description: "Hello description",
      },
    ];

    idExistsStub.returns(returnVal);

    const userexist = todoServices.getOneTodoService(1, 1);

    expect(idExistsStub.callCount).toBe(1);
    expect(idExistsStub.getCall(0).args).toEqual([1]);
  });
});

describe("Delete Todo", () => {
  let idExistsStub: sinon.SinonStub;
  let removeOneTodoStub: sinon.SinonStub;

  before(() => {
    idExistsStub = sinon.stub(todo, "idExists");
    removeOneTodoStub = sinon.stub(todo, "removeOneTodo");
  });

  afterEach(() => {
    idExistsStub.reset();
    removeOneTodoStub.reset();
  });

  after(() => {
    idExistsStub.restore();
    removeOneTodoStub.restore();
  });

  it("delete Todo service", () => {
    const returnVal = [
      true,
      {
        id: 1,
        userId: 1,
        title: "Hello",
        description: "Hello description",
      },
    ];

    idExistsStub.returns(returnVal);

    removeOneTodoStub.returns(true);

    const deleteTodo = todoServices.deleteTodoService(1);

    expect(deleteTodo).toBe(true);

    expect(idExistsStub.callCount).toBe(1);
    expect(removeOneTodoStub.callCount).toBe(1);

    expect(idExistsStub.getCall(0).args).toEqual([1]);
  });
});
