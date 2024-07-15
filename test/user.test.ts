import expect from "expect";
import sinon from "sinon";
import * as user from "../src/model/userModel";
import * as userServices from "../src/services/userService";
import bcrypt from "bcrypt";
import { UpdateError } from "../src/utils/error";

describe("User Create Service", () => {
  let createNewUserModelStub: sinon.SinonStub;

  before(() => {
    createNewUserModelStub = sinon.stub(user, "createNewUser");
  });

  afterEach(() => {
    createNewUserModelStub.reset();
  });

  after(() => {
    createNewUserModelStub.restore();
  });

  it("create User", () => {
    const userData: user.User = {
      id: 1,
      username: "Brian",
      gender: "male",
      email: "brian123@gmail.com",
      accessLevel: user.UserAccessLevel.normal,
      password: "password",
    };

    createNewUserModelStub.returns({ ...userData, password: "encrypted" });

    const userCreated = userServices.createUserService(userData);

    expect(userCreated).toEqual({ ...userData, password: "encrypted" });
  });
});

describe("Update User password Service", () => {
  let userUpdateByIdStub: sinon.SinonStub;
  let hashStub: sinon.SinonStub;

  before(() => {
    userUpdateByIdStub = sinon.stub(user, "updateUserById");
    hashStub = sinon.stub(bcrypt, "hash");
  });

  afterEach(() => {
    userUpdateByIdStub.reset();
    hashStub.reset();
  });

  after(() => {
    userUpdateByIdStub.restore();
    hashStub.restore();
  });

  it("Update User password", async () => {
    const userData: user.User = {
      id: 1,
      username: "Brian",
      gender: "male",
      email: "brian123@gmail.com",
      accessLevel: user.UserAccessLevel.normal,
      password: "password",
    };

    const updateUserPasswordArgs: [number, string, user.User] = [
      1,
      "hello1",
      userData,
    ];

    const encryptedPass = "encryptedPass";

    hashStub.resolves(encryptedPass);

    const updateUserPasswordService =
      await userServices.updateUserPasswordService(...updateUserPasswordArgs);

    expect(userUpdateByIdStub.getCall(0).args).toEqual([
      1,
      { ...userData, password: encryptedPass },
    ]);
  });

  it("Update User password error", async () => {
    const userData: user.User = {
      id: 1,
      username: "Brian",
      gender: "male",
      email: "brian123@gmail.com",
      accessLevel: user.UserAccessLevel.normal,
      password: "password",
    };

    const updateUserPasswordArgs: [number, string, user.User] = [
      1,
      "hello1",
      userData,
    ];

    userUpdateByIdStub.throws(new Error());

    const encryptedPass = "encryptedPass";

    hashStub.resolves(encryptedPass);

    try {
      await userServices.updateUserPasswordService(...updateUserPasswordArgs);
    } catch (err) {
      expect(err).toBeInstanceOf(UpdateError);
    }
  });
});
