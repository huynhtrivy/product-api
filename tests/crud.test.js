const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/productdb_test";

beforeAll(async () => {
  await mongoose.connect(MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Kiểm thử toàn diện CRUD Product API", () => {
  const sampleProduct = {
    pid: "P101",
    pname: "Bàn phím cơ",
    price: 1500000,
    quantity: 10,
  };

  // 1. CREATE
  it("POST /api/products - Tạo mới sản phẩm thành công", async () => {
    const res = await request(app)
      .post("/api/products")
      .send(sampleProduct);

    expect(res.statusCode).toBe(201);
    expect(res.body.pid).toBe(sampleProduct.pid);
    expect(res.body.pname).toBe(sampleProduct.pname);
  });

  // 2. READ ALL
  it("GET /api/products - Lấy danh sách sản phẩm", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // 3. READ ONE
  it("GET /api/products/:pid - Lấy chi tiết sản phẩm theo pid", async () => {
    const res = await request(app).get(`/api/products/${sampleProduct.pid}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.pid).toBe(sampleProduct.pid);
  });

  // 4. UPDATE
  it("PUT /api/products/:pid - Cập nhật thông tin sản phẩm", async () => {
    const res = await request(app)
      .put(`/api/products/${sampleProduct.pid}`)
      .send({ price: 1800000, quantity: 15 });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(1800000);
    expect(res.body.quantity).toBe(15);
  });

  // 5. DELETE
  it("DELETE /api/products/:pid - Xóa sản phẩm", async () => {
    const res = await request(app).delete(`/api/products/${sampleProduct.pid}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Xóa sản phẩm thành công");
  });
});