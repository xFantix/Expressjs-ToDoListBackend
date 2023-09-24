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

describe("API connection", () => {
  test("Server is up!", async () => {
    const { statusCode } = await request(server).get("/tasks");
    expect(statusCode).toBe(200);
  });
});
