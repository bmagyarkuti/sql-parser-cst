import { testExpr } from "../test_utils";

describe("comparison operators", () => {
  ["<=>", ">=", ">", "<=", "<>", "<", "=", "!="].forEach((op) => {
    it(`parses ${op} operator`, () => {
      testExpr(`5 ${op} 7`);
      testExpr(`6 /* com1 */ ${op} /* com2 */ 7`);
    });
  });

  it("parses IS operator", () => {
    testExpr(`7 IS 5`);
    testExpr(`7 /*c1*/ IS /*c2*/ 5`);
  });

  it("parses IS NOT operator", () => {
    testExpr(`7 IS NOT 5`);
    testExpr(`7 /*c1*/ IS /*c2*/ NOT /*c3*/ 5`);
  });

  it("parses basic IN operator", () => {
    testExpr(`'oo' IN 'foobar'`);
    testExpr(`'oo' /*c1*/ IN /*c2*/ 'foobar'`);
  });

  it("parses basic NOT IN operator", () => {
    testExpr(`'oo' NOT IN 'foobar'`);
    testExpr(`'oo' /*c1*/ NOT /*c2*/ IN /*c3*/ 'foobar'`);
  });

  it("parses IN (...) operator", () => {
    testExpr(`7 IN (1, 2, 3, 4)`);
    testExpr(`7 NOT IN (1, 2, 3, 4)`);
    testExpr(`7 /*c*/ IN /*c0*/ (/*c1*/ 1 /*c2*/, /*c3*/ 2 /*c4*/)`);
    testExpr(`7 /**/ NOT /*c*/ IN /*c0*/ (/*c1*/ 1 /*c2*/, /*c3*/ 2 /*c4*/)`);
  });

  it("parses BETWEEN operator", () => {
    testExpr(`5 BETWEEN 1 AND 10`);
    testExpr(`5 between 1 and 10`);
    testExpr(`5 /*c1*/ BETWEEN /*c2*/ 1 /*c3*/ AND /*c4*/ 10`);
  });

  it("parses NOT BETWEEN operator", () => {
    testExpr(`5 NOT BETWEEN 1 AND 10`);
    testExpr(`5 /*c0*/ not /*c1*/ BETWEEN /*c2*/ 1 /*c3*/ AND /*c4*/ 10`);
  });
});
