import { dialect, test, testWc } from "../test_utils";

describe("function", () => {
  dialect("bigquery", () => {
    describe("CREATE FUNCTION", () => {
      it("supports basic CREATE FUNCTION", () => {
        testWc("CREATE FUNCTION foo ( ) AS (1 * 2)");
        testWc("CREATE FUNCTION foo.bar.baz ( ) AS (1)");
      });

      it("supports parameters", () => {
        testWc("CREATE FUNCTION multiplicate ( x INT , y INT ) AS (x * y)");
      });

      it("supports OR REPLACE", () => {
        testWc("CREATE OR REPLACE FUNCTION foo() AS (1)");
      });

      it("supports TEMPORARY FUNCTION", () => {
        testWc("CREATE TEMP FUNCTION foo() AS (1)");
        testWc("CREATE TEMPORARY FUNCTION foo() AS (1)");
      });

      it("supports IF NOT EXISTS", () => {
        testWc("CREATE FUNCTION IF NOT EXISTS foo() AS (1)");
      });

      it("supports RETURNS", () => {
        testWc("CREATE FUNCTION foo() RETURNS INT AS (1)");
      });

      it("supports OPTIONS(..)", () => {
        testWc("CREATE FUNCTION foo() OPTIONS (description='hello') AS (1)");
        testWc("CREATE FUNCTION foo() AS (1) OPTIONS (description='my func')");
      });

      describe("JS functions", () => {
        it("supports LANGUAGE js", () => {
          testWc("CREATE FUNCTION foo() RETURNS INT LANGUAGE js AS 'return(x*y);'");
        });

        it("does not support JS language (only lowercase 'js')", () => {
          expect(() =>
            test("CREATE FUNCTION foo() RETURNS INT LANGUAGE JS AS 'return(x*y);'")
          ).toThrowError();
        });

        it("supports DETERMINISTIC / NOT DETERMINISTIC", () => {
          testWc(`CREATE FUNCTION foo() RETURNS STRING DETERMINISTIC LANGUAGE js AS 'return("");'`);
          testWc(`CREATE FUNCTION foo() RETURNS INT NOT DETERMINISTIC LANGUAGE js AS 'return(0);'`);
        });

        it("supports OPTIONS(..)", () => {
          testWc(
            "CREATE FUNCTION foo() RETURNS INT LANGUAGE js OPTIONS (foo=15) AS 'return(x*y);'"
          );
          testWc("CREATE FUNCTION foo() RETURNS INT LANGUAGE js AS 'return(x*y);' OPTIONS(foo=2)");
        });
      });
    });

    describe("DROP FUNCTION", () => {
      it("supports basic DROP FUNCTION", () => {
        testWc("DROP FUNCTION foo");
        testWc("DROP FUNCTION foo.bar.baz");
      });

      it("supports IF EXISTS", () => {
        testWc("DROP FUNCTION IF EXISTS foo");
      });

      it("supports DROP TABlE FUNCTION", () => {
        testWc("DROP TABLE FUNCTION foo");
        testWc("DROP TABLE FUNCTION IF EXISTS foo.bar.baz");
      });
    });
  });

  dialect(["mysql", "sqlite"], () => {
    it("does not support CREATE FUNCTION", () => {
      expect(() => test("CREATE FUNCTION foo() AS (1 + 2)")).toThrowError();
    });
  });
});
