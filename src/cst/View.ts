import { BaseNode, Keyword } from "./Base";
import { ColumnRef, ListExpr, ParenExpr, TableRef } from "./Expr";
import { SubSelect } from "./Select";

// CREATE VIEW
export interface CreateViewStmt extends BaseNode {
  type: "create_view_stmt";
  createKw: Keyword<"CREATE">;
  temporaryKw?: Keyword<"TEMP" | "TEMPORARY">;
  viewKw: Keyword<"VIEW">;
  ifNotExistsKw?: [Keyword<"IF">, Keyword<"NOT">, Keyword<"EXISTS">];
  name: TableRef;
  columns?: ParenExpr<ListExpr<ColumnRef>>;
  asKw: Keyword<"AS">;
  expr: SubSelect;
}

// DROP VIEW
export interface DropViewStmt extends BaseNode {
  type: "drop_view_stmt";
  dropViewKw: [Keyword<"DROP">, Keyword<"VIEW">];
  ifExistsKw?: [Keyword<"IF">, Keyword<"EXISTS">];
  views: ListExpr<TableRef>;
  behaviorKw?: Keyword<"CASCADE" | "RESTRICT">;
}