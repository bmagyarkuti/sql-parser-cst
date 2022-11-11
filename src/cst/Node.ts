export * from "./Base";
export * from "./Literal";
export * from "./Expr";
export * from "./Sqlite";
export * from "./Transaction";
export * from "./WindowFrame";
export * from "./Trigger";
export * from "./Constraint";
export * from "./Insert";
export * from "./CreateTable";
export * from "./AlterTable";
export * from "./Select";
export * from "./Alias";
export * from "./View";
export * from "./Index";
import { Alias } from "./Alias";
import { AlterAction, AlterTableStmt } from "./AlterTable";
import { AllColumns, BaseNode, Keyword } from "./Base";
import { AllConstraintNodes } from "./Constraint";
import { AllCreateTableNodes, CreateTableStmt } from "./CreateTable";
import { AllExprNodes, ListExpr, TableRef } from "./Expr";
import { CreateIndexStmt, DropIndexStmt } from "./Index";
import { AllInsertNodes, InsertStmt } from "./Insert";
import {
  AllSelectNodes,
  CompoundSelectStmt,
  ReturningClause,
  SelectStmt,
  WhereClause,
  WithClause,
} from "./Select";
import { AllSqliteNodes, SqliteStmt } from "./Sqlite";
import { AllTransactionNodes, TransactionStmt } from "./Transaction";
import { AllTriggerNodes, CreateTriggerStmt, DropTriggerStmt } from "./Trigger";
import { AllUpdateNodes, UpdateStmt } from "./Update";
import { CreateViewStmt, DropViewStmt } from "./View";
import { AllFrameNodes } from "./WindowFrame";

export type Node =
  | Program
  | Statement
  | AllExprNodes
  | Keyword
  | AllSelectNodes
  | AllCreateTableNodes
  | AllConstraintNodes
  | AlterAction
  | AllTriggerNodes
  | AllColumns
  | AllTransactionNodes
  | AllFrameNodes
  | AllInsertNodes
  | AllUpdateNodes
  | Alias
  | AllSqliteNodes;

export interface Program extends BaseNode {
  type: "program";
  statements: Statement[];
}

export type Statement =
  | EmptyStmt
  | CompoundSelectStmt
  | SelectStmt
  | CreateTableStmt
  | AlterTableStmt
  | DropTableStmt
  | InsertStmt
  | DeleteStmt
  | UpdateStmt
  | CreateViewStmt
  | DropViewStmt
  | CreateIndexStmt
  | DropIndexStmt
  | CreateTriggerStmt
  | DropTriggerStmt
  | AnalyzeStmt
  | ExplainStmt
  | TransactionStmt
  | SqliteStmt;

export interface EmptyStmt extends BaseNode {
  type: "empty_stmt";
}

// DROP TABLE
export interface DropTableStmt extends BaseNode {
  type: "drop_table_stmt";
  dropKw: Keyword<"DROP">;
  temporaryKw?: Keyword<"TEMP" | "TEMPORARY">;
  tableKw: Keyword<"TABLE">;
  ifExistsKw?: [Keyword<"IF">, Keyword<"EXISTS">];
  tables: ListExpr<TableRef>;
  behaviorKw?: Keyword<"CASCADE" | "RESTRICT">;
}

// DELETE FROM
export interface DeleteStmt extends BaseNode {
  type: "delete_stmt";
  with?: WithClause;
  deleteKw: Keyword<"DELETE">;
  fromKw: Keyword<"FROM">;
  table: TableRef | Alias<TableRef>;
  where?: WhereClause;
  returning?: ReturningClause;
}

// ANALYZE
export interface AnalyzeStmt extends BaseNode {
  type: "analyze_stmt";
  analyzeKw: Keyword<"ANALYZE">;
  tableKw?: Keyword<"TABLE">;
  tables: ListExpr<TableRef>;
}

// EXPLAIN
export interface ExplainStmt extends BaseNode {
  type: "explain_stmt";
  explainKw: Keyword<"EXPLAIN" | "DESCRIBE" | "DESC">;
  analyzeKw?: Keyword<"ANALYZE">;
  queryPlanKw?: [Keyword<"QUERY">, Keyword<"PLAN">];
  statement: Statement;
}
