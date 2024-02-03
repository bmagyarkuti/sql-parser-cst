import { BaseNode, Keyword } from "./Base";
import { IndexSpecification } from "./Constraint";
import { TablespaceClause, UsingAccessMethodClause } from "./CreateTable";
import { BigqueryOptions } from "./dialects/Bigquery";
import { ListExpr, ParenExpr, EntityName, Identifier } from "./Expr";
import { PostgresqlWithOptions } from "./Node";
import { TableWithoutInheritance, WhereClause } from "./Select";

export type AllIndexNodes =
  | AllIndexStatements
  | VerboseAllColumns
  | IndexIncludeClause;

export type AllIndexStatements = CreateIndexStmt | DropIndexStmt;

// CREATE INDEX
export interface CreateIndexStmt extends BaseNode {
  type: "create_index_stmt";
  createKw: Keyword<"CREATE">;
  indexTypeKw?: Keyword<"UNIQUE" | "FULLTEXT" | "SPATIAL" | "SEARCH">;
  indexKw: Keyword<"INDEX">;
  concurrentlyKw?: Keyword<"CONCURRENTLY">;
  ifNotExistsKw?: [Keyword<"IF">, Keyword<"NOT">, Keyword<"EXISTS">];
  name?: EntityName;
  onKw: Keyword<"ON">;
  table: EntityName | TableWithoutInheritance;
  using?: UsingAccessMethodClause;
  columns:
    | ParenExpr<ListExpr<IndexSpecification>>
    | ParenExpr<VerboseAllColumns>;
  clauses: CreateIndexClause[];
}

type CreateIndexClause =
  | WhereClause
  | BigqueryOptions
  | IndexIncludeClause
  | TablespaceClause
  | PostgresqlWithOptions;

// In contrast to normal AllColumns node, which represents the star (*)
export interface VerboseAllColumns extends BaseNode {
  type: "verbose_all_columns";
  allColumnsKw: [Keyword<"ALL">, Keyword<"COLUMNS">];
}

export interface IndexIncludeClause extends BaseNode {
  type: "index_include_clause";
  includeKw: Keyword<"INCLUDE">;
  columns: ParenExpr<ListExpr<Identifier>>;
}

// DROP INDEX
export interface DropIndexStmt extends BaseNode {
  type: "drop_index_stmt";
  dropKw: Keyword<"DROP">;
  indexTypeKw?: Keyword<"SEARCH">;
  indexKw: Keyword<"INDEX">;
  concurrentlyKw?: Keyword<"CONCURRENTLY">;
  ifExistsKw?: [Keyword<"IF">, Keyword<"EXISTS">];
  indexes: ListExpr<EntityName>;
  onKw?: Keyword<"ON">;
  table?: EntityName;
  behaviorKw?: Keyword<"CASCADE" | "RESTRICT">;
}
