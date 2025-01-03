import { AlterRoleAction } from "./AlterAction";
import { BaseNode, Keyword } from "./Base";
import { FuncCall, Identifier, ListExpr } from "./Expr";
import { NullLiteral, NumberLiteral, StringLiteral } from "./Literal";

export type AllRoleNodes = AllRoleStatements | RoleOption | InDatabaseClause;

export type AllRoleStatements =
  | CreateRoleStmt
  | AlterRoleStmt
  | DropRoleStmt
  | SetRoleStmt
  | ResetRoleStmt;

export type RoleSpecification = Identifier | FuncCall;

// CREATE ROLE
export interface CreateRoleStmt extends BaseNode {
  type: "create_role_stmt";
  createRoleKw: [Keyword<"CREATE">, Keyword<"ROLE" | "USER" | "GROUP">];
  name: Identifier;
  withKw?: Keyword<"WITH">;
  options?: RoleOption[];
}

export type RoleOption =
  | RoleOptionKeyword
  | RoleOptionConnectionLimit
  | RoleOptionPassword
  | RoleOptionValidUntil
  | RoleOptionInRole
  | RoleOptionRole
  | RoleOptionAdmin
  | RoleOptionSysId;

export interface RoleOptionKeyword extends BaseNode {
  type: "role_option_keyword";
  kw: Keyword<
    | "SUPERUSER"
    | "NOSUPERUSER"
    | "CREATEDB"
    | "NOCREATEDB"
    | "CREATEROLE"
    | "NOCREATEROLE"
    | "INHERIT"
    | "NOINHERIT"
    | "LOGIN"
    | "NOLOGIN"
    | "REPLICATION"
    | "NOREPLICATION"
    | "BYPASSRLS"
    | "NOBYPASSRLS"
  >;
}

export interface RoleOptionConnectionLimit extends BaseNode {
  type: "role_option_connection_limit";
  connectionLimitKw: [Keyword<"CONNECTION">, Keyword<"LIMIT">];
  limit: NumberLiteral;
}

export interface RoleOptionPassword extends BaseNode {
  type: "role_option_password";
  encryptedKw?: Keyword<"ENCRYPTED">;
  passwordKw: Keyword<"PASSWORD">;
  password: StringLiteral | NullLiteral;
}

export interface RoleOptionValidUntil extends BaseNode {
  type: "role_option_valid_until";
  validUntilKw: [Keyword<"VALID">, Keyword<"UNTIL">];
  timestamp: StringLiteral;
}

export interface RoleOptionInRole extends BaseNode {
  type: "role_option_in_role";
  inRoleKw: [Keyword<"IN">, Keyword<"ROLE">];
  names: ListExpr<RoleSpecification>;
}

export interface RoleOptionRole extends BaseNode {
  type: "role_option_role";
  roleKw: Keyword<"ROLE">;
  names: ListExpr<RoleSpecification>;
}

export interface RoleOptionAdmin extends BaseNode {
  type: "role_option_admin";
  adminKw: Keyword<"ADMIN">;
  names: ListExpr<RoleSpecification>;
}

export interface RoleOptionSysId extends BaseNode {
  type: "role_option_sysid";
  sysIdKw: Keyword<"SYSID">;
  sysId: NumberLiteral;
}

// ALTER ROLE
export interface AlterRoleStmt extends BaseNode {
  type: "alter_role_stmt";
  alterRoleKw: [Keyword<"ALTER">, Keyword<"ROLE" | "USER" | "GROUP">];
  name: RoleSpecification | Keyword<"ALL">;
  database?: InDatabaseClause;
  action: AlterRoleAction;
}

export interface InDatabaseClause extends BaseNode {
  type: "in_database_clause";
  inDatabaseKw: [Keyword<"IN">, Keyword<"DATABASE">];
  name: Identifier;
}

// DROP ROLE
export interface DropRoleStmt extends BaseNode {
  type: "drop_role_stmt";
  dropRoleKw: [Keyword<"DROP">, Keyword<"ROLE" | "USER" | "GROUP">];
  ifExistsKw?: [Keyword<"IF">, Keyword<"EXISTS">];
  names: ListExpr<RoleSpecification>;
}

// SET ROLE
export interface SetRoleStmt extends BaseNode {
  type: "set_role_stmt";
  setKw: Keyword<"SET">;
  scopeKw?: Keyword<"SESSION" | "LOCAL">;
  roleKw: Keyword<"ROLE">;
  name: Identifier | StringLiteral | Keyword<"NONE">;
}

// RESET ROLE
export interface ResetRoleStmt extends BaseNode {
  type: "reset_role_stmt";
  resetRoleKw: [Keyword<"RESET">, Keyword<"ROLE">];
}
