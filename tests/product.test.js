const request = require("supertest");
const app = require("../server");
const Product = require("../models/Product");

// Mock model Product để kiểm thử controller CRUD
jest.mock("../models/Product");

describe("Product CRUD API Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockProduct = {
    pid: "P001",
    pname: "Laptop Dell",
    price: 1500,
    quantity: 10,
  };

  // 1. CREATE
  it("POST /api/products - Nên tạo mới một sản phẩm", async () => {
    Product.prototype.save = jest.fn().mockResolvedValue(mockProduct);

    const res = await request(app)
      .post("/api/products")
      .send(mockProduct);

    expect(res.statusCode).toBe(201);
    expect(res.body.pid).toBe("P001");
    expect(res.body.pname).toBe("Laptop Dell");
  });

  // 2. READ ALL
  it("GET /api/products - Nên lấy danh sách tất cả sản phẩm", async () => {
    Product.find = jest.fn().mockResolvedValue([mockProduct]);

    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBe(1);
    expect(res.body[0].pid).toBe("P001");
  });

  // 3. READ ONE
  it("GET /api/products/:pid - Nên lấy chi tiết sản phẩm theo pid", async () => {
    Product.findOne = jest.fn().mockResolvedValue(mockProduct);

    const res = await request(app).get("/api/products/P001");

    expect(res.statusCode).toBe(200);
    expect(res.body.pid).toBe("P001");
    expect(res.body.pname).toBe("Laptop Dell");
  });

  // 4. UPDATE
  it("PUT /api/products/:pid - Nên cập nhật thông tin sản phẩm", async () => {
    const updatedData = { ...mockProduct, pname: "Laptop Dell XPS", price: 1800 };
    Product.findOneAndUpdate = jest.fn().mockResolvedValue(updatedData);

    const res = await request(app)
      .put("/api/products/P001")
      .send({
        pname: "Laptop Dell XPS",
        price: 1800,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.pname).toBe("Laptop Dell XPS");
    expect(res.body.price).toBe(1800);
  });

  // 5. DELETE
  it("DELETE /api/products/:pid - Nên xóa sản phẩm", async () => {
    Product.findOneAndDelete = jest.fn().mockResolvedValue(mockProduct);

    const res = await request(app).delete("/api/products/P001");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Xóa sản phẩm thành công");
  });
});