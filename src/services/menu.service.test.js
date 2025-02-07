const { expect } = require("chai");
const sinon = require("sinon");
const { MenuModel } = require("../models");
const apiResponse = require("../utils/api-response.util");
const log = require("../utils/auth.util");
const menuService = require("../services/menu.service");

describe("Menu Service", () => {
  describe("getMenuByMerchantId", () => {
    let findStub, logStub, apiResponseStub;

    beforeEach(() => {
      findStub = sinon.stub(MenuModel, "find");
      logStub = sinon.stub(log, "err"); // Use the correct function name
      apiResponseStub = sinon.stub(apiResponse, "notFoundResponse");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should return a categorized menu when menu items exist", async () => {
      const mockMenu = [
        { _id: "1", merchantId: "merchant123", categoryName: "Drinks", name: "Coffee" },
        { _id: "2", merchantId: "merchant123", categoryName: "Drinks", name: "Tea" },
        { _id: "3", merchantId: "merchant123", categoryName: "Food", name: "Burger" },
      ];
      findStub.resolves(mockMenu);

      const result = await menuService.getMenuByMerchantId("merchant123");
      expect(result).to.have.property("Drinks").that.is.an("array");
      expect(result).to.have.property("Food").that.is.an("array");
      expect(result["Drinks"]).to.have.lengthOf(2);
      expect(result["Food"]).to.have.lengthOf(1);
    });

    it("should return not found response when no menu items exist", async () => {
      findStub.resolves([]);
      apiResponseStub.returns("Menu not found");
      
      const result = await menuService.getMenuByMerchantId("merchant123");
      expect(result).to.equal("Menu not found");
    });

    it("should handle errors and log them", async () => {
      const error = new Error("Database error");
      findStub.rejects(error);
      
      const result = await menuService.getMenuByMerchantId("merchant123");
      expect(logStub.calledOnce).to.be.true;
      expect(result).to.be.an("array").that.is.empty;
    });
  });
});
