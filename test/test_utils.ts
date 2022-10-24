import { Expr, Program, Statement, Whitespace } from "../pegjs/sql";
import { parse as parseSql, ParserOptions, show } from "../src/parser";

type Dialect = "mysql" | "sqlite";

declare var __SQL_DIALECT__: Dialect;

export const preserveAll: ParserOptions = {
  preserveComments: true,
  preserveNewlines: true,
  preserveSpaces: true,
};

export function parse(sql: string, options: ParserOptions = {}): Program {
  return parseSql(sql, {
    dialect: __SQL_DIALECT__,
    ...options,
  });
}

export function parseStmt(sql: string, options: ParserOptions = {}): Statement {
  const { statements } = parse(sql, options);
  if (statements.length !== 1) {
    throw new Error(`Expected one statement, instead got ${statements.length}`);
  }
  return statements[0];
}

export function dialect(lang: Dialect | Dialect[], block: () => void) {
  lang = typeof lang === "string" ? [lang] : lang;
  if (lang.includes(__SQL_DIALECT__)) {
    describe(__SQL_DIALECT__, block);
  }
}

export function test(sql: string) {
  expect(show(parse(sql, preserveAll))).toBe(sql);
}

export function testExpr(expr: string) {
  expect(show(parse(`SELECT ${expr}`, preserveAll))).toBe(`SELECT ${expr}`);
}

export function parseExpr(expr: string, options?: ParserOptions) {
  const stmt = parseStmt(`SELECT ${expr}`, options);
  if (stmt.type !== "select_statement") {
    throw new Error(`Expected select_statement, instead got ${stmt.type}`);
  }
  const clause = stmt.clauses[0];
  if (clause.type !== "select_clause") {
    throw new Error(`Expected select_clause, instead got ${clause.type}`);
  }
  if (clause.columns.length !== 1) {
    throw new Error(`Expected 1 column, instead got ${clause.columns.length}`);
  }
  return clause.columns[0];
}

/**
 * Converts SQL expression to parenthesized version.
 * For example:
 *
 *     showPrecedence("1 + 2 / 3") --> "(1 + (2 / 3))"
 */
export function showPrecedence(sql: string): string {
  return show(addPrecedenceParens(parseExpr(sql)));
}

function addPrecedenceParens(expr: Expr): Expr {
  const space: Whitespace[] = [{ type: "space", text: " " }];

  if (expr.type === "binary_expr") {
    return {
      type: "paren_expr",
      expr: {
        ...expr,
        left: { ...addPrecedenceParens(expr.left), trailing: space },
        right: { ...addPrecedenceParens(expr.right), leading: space },
      },
    };
  } else if (expr.type === "unary_expr") {
    return {
      type: "paren_expr",
      expr: {
        ...expr,
        expr: { ...addPrecedenceParens(expr.expr), leading: space },
      },
    };
  } else {
    return expr;
  }
}

export { show };
