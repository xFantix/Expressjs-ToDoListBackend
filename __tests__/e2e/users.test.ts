import { Server } from "http";
import request from "supertest";

import { closeDatabase, startServerForTest } from "../utils/testsHelper";

let server: Server;

beforeAll(async () => {
  server = await startServerForTest();
});

afterAll(async () => {
  await closeDatabase();
  server.close();
});

const randomUser = {
  firstName: "Jan",
  surname: "Kowalski",
  email: "jan.kowalski@example.com",
};

describe("Users test", () => {
  test('create user"', async () => {
    const { statusCode, body } = await request(server)
      .post("/users")
      .send(randomUser);
    expect(statusCode).toBe(201);
    expect(body).toEqual({ message: "'Record has been successfully added" });
  });

  test('send bad data"', async () => {
    const { statusCode, body } = await request(server).post("/users").send({});
    expect(statusCode).toBe(400);
    expect(body.message).toEqual(
      '"firstName" is required. "surname" is required. "email" is required'
    );
  });

  test('send bad format email"', async () => {
    const { statusCode, body } = await request(server)
      .post("/users")
      .send({ ...randomUser, email: "xyz" });
    expect(statusCode).toBe(400);
    expect(body.message).toEqual('"email" must be a valid email');
  });

  test('get users list"', async () => {
    const { statusCode, body } = await request(server).get("/users");

    const { firstName, surname, email, id } = body[0];

    expect(statusCode).toBe(200);
    expect(id).toBe(1);
    expect(firstName).toBe(randomUser.firstName);
    expect(surname).toBe(randomUser.surname);
    expect(email).toBe(randomUser.email);
  });

  test('remove user from list"', async () => {
    const { statusCode: statusCodeDelete, body: bodyDelete } = await request(
      server
    ).delete("/users/1");

    expect(statusCodeDelete).toBe(200);
    expect(bodyDelete).toEqual({
      message: "Record has been successfully deleted.",
    });

    const { statusCode: statusCodeGet, body: bodyGet } = await request(
      server
    ).get("/users");

    expect(statusCodeGet).toBe(200);
    expect(bodyGet).toEqual([]);
  });

  test('edit user from list"', async () => {
    await request(server).post("/users").send(randomUser);

    const swapFirstName = "Joe";

    const { statusCode: statusCodeEdit, body: bodyEdit } = await request(server)
      .patch("/users/2")
      .send({ ...randomUser, firstName: swapFirstName });

    expect(statusCodeEdit).toBe(200);
    expect(bodyEdit).toEqual({
      message: "Record has been successfully updated.",
    });

    const { statusCode: statusCodeGet, body: bodyGet } = await request(
      server
    ).get("/users/2");

    expect(statusCodeGet).toBe(200);
    expect(bodyGet.firstName).toBe(swapFirstName);
  });
});
