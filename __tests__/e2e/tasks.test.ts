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

const randomTask = {
  title: "Zadanie testowe3",
  description: "Opis zadania testowego",
  isImportant: true,
  endDate: "2023-09-30T12:00:00Z",
  userId: 1,
};

describe("Tasks test", () => {
  test('create task"', async () => {
    await request(server).post("/users").send(randomUser);
    const { statusCode, body } = await request(server)
      .post("/tasks")
      .send(randomTask);
    expect(statusCode).toBe(201);
    expect(body).toEqual({ message: "Record has been successfully added" });
  });

  test('edit task"', async () => {
    const swapTitle = "TEST";
    const { statusCode, body } = await request(server)
      .patch("/tasks/1")
      .send({ ...randomTask, title: swapTitle });
    expect(statusCode).toBe(200);
    expect(body).toEqual({
      message: "Record has been successfully updated.",
    });
  });

  test('remove task"', async () => {
    const { statusCode, body } = await request(server).delete("/tasks/1");
    expect(statusCode).toBe(200);
    expect(body).toEqual({ message: "Record has been successfully deleted." });
  });
});
