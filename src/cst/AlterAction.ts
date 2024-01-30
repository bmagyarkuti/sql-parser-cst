import { BaseNode, Keyword } from "./Base";
import { BigqueryOptions } from "./dialects/Bigquery";
import { ColumnDefinition } from "./CreateTable";
import { DataType } from "./DataType";
import { Expr, Identifier, EntityName, FuncCall } from "./Expr";
import { StringLiteral } from "./Literal";
import { Constraint, ConstraintModifier, TableConstraint } from "./Constraint";

export type AllAlterActionNodes =
  | AlterTableAction
  | AlterColumnAction
  | AlterSchemaAction;

export type AlterTableAction =
  | AlterActionRename
  | AlterActionRenameColumn
  | AlterActionAddColumn
  | AlterActionDropColumn
  | AlterActionAlterColumn
  | AlterActionSetDefaultCollate
  | AlterActionSetOptions
  | AlterActionAddConstraint
  | AlterActionDropConstraint
  | AlterActionAlterConstraint
  | AlterActionRenameConstraint
  | AlterActionValidateConstraint
  | AlterActionOwnerTo;

export type AlterSchemaAction =
  | AlterActionSetDefaultCollate
  | AlterActionSetOptions
  | AlterActionRename
  | AlterActionOwnerTo;

export type AlterViewAction =
  | AlterActionSetOptions
  | AlterActionRename
  | AlterActionRenameColumn
  | AlterActionOwnerTo
  | AlterActionAlterColumn;

export interface AlterActionRename extends BaseNode {
  type: "alter_action_rename";
  renameKw: Keyword<"RENAME"> | [Keyword<"RENAME">, Keyword<"TO" | "AS">];
  newName: EntityName;
}

export interface AlterActionRenameColumn extends BaseNode {
  type: "alter_action_rename_column";
  renameKw: Keyword<"RENAME"> | [Keyword<"RENAME">, Keyword<"COLUMN">];
  ifExistsKw?: [Keyword<"IF">, Keyword<"EXISTS">];
  oldName: Identifier;
  toKw: Keyword<"TO">;
  newName: Identifier;
}

export interface AlterActionAddColumn extends BaseNode {
  type: "alter_action_add_column";
  addKw: Keyword<"ADD"> | [Keyword<"ADD">, Keyword<"COLUMN">];
  ifNotExistsKw?: [Keyword<"IF">, Keyword<"NOT">, Keyword<"EXISTS">];
  column: ColumnDefinition;
}

export interface AlterActionDropColumn extends BaseNode {
  type: "alter_action_drop_column";
  dropKw: Keyword<"DROP"> | [Keyword<"DROP">, Keyword<"COLUMN">];
  ifExistsKw?: [Keyword<"IF">, Keyword<"EXISTS">];
  column: Identifier;
  behaviorKw?: Keyword<"CASCADE" | "RESTRICT">;
}

export interface AlterActionAlterColumn extends BaseNode {
  type: "alter_action_alter_column";
  alterKw: Keyword<"ALTER"> | [Keyword<"ALTER">, Keyword<"COLUMN">];
  ifExistsKw?: [Keyword<"IF">, Keyword<"EXISTS">];
  column: Identifier;
  action: AlterColumnAction;
}

export interface AlterActionSetDefaultCollate extends BaseNode {
  type: "alter_action_set_default_collate";
  setDefaultCollateKw: [Keyword<"SET">, Keyword<"DEFAULT">, Keyword<"COLLATE">];
  collation: StringLiteral;
}

export interface AlterActionSetOptions extends BaseNode {
  type: "alter_action_set_options";
  setKw: Keyword<"SET">;
  options: BigqueryOptions;
}

// MySQL, MariaDB, PostgreSQL
export interface AlterActionAddConstraint extends BaseNode {
  type: "alter_action_add_constraint";
  addKw: Keyword<"ADD">;
  constraint: Constraint<TableConstraint>;
}

// MySQL, MariaDB, PostgreSQL
export interface AlterActionDropConstraint extends BaseNode {
  type: "alter_action_drop_constraint";
  dropConstraintKw: [Keyword<"DROP">, Keyword<"CONSTRAINT" | "CHECK">];
  ifExistsKw?: [Keyword<"IF">, Keyword<"EXISTS">];
  constraint: Identifier;
  behaviorKw?: Keyword<"CASCADE" | "RESTRICT">;
}

// MySQL, PostgreSQL
export interface AlterActionAlterConstraint extends BaseNode {
  type: "alter_action_alter_constraint";
  alterConstraintKw: [Keyword<"ALTER">, Keyword<"CONSTRAINT" | "CHECK">];
  constraint: Identifier;
  modifiers: ConstraintModifier[];
}

// PostgreSQL
export interface AlterActionRenameConstraint extends BaseNode {
  type: "alter_action_rename_constraint";
  renameConstraintKw: [Keyword<"RENAME">, Keyword<"CONSTRAINT">];
  oldName: Identifier;
  toKw: Keyword<"TO">;
  newName: Identifier;
}

// PostgreSQL
export interface AlterActionValidateConstraint extends BaseNode {
  type: "alter_action_validate_constraint";
  validateConstraintKw: [Keyword<"VALIDATE">, Keyword<"CONSTRAINT">];
  constraint: Identifier;
}

// PostgreSQL
export interface AlterActionOwnerTo extends BaseNode {
  type: "alter_action_owner_to";
  ownerToKw: [Keyword<"OWNER">, Keyword<"TO">];
  owner: Identifier | FuncCall;
}

export type AlterColumnAction =
  | AlterActionSetDefault
  | AlterActionDropDefault
  | AlterActionSetNotNull
  | AlterActionDropNotNull
  | AlterActionSetDataType
  | AlterActionSetOptions
  | AlterActionSetVisible
  | AlterActionSetInvisible;

export interface AlterActionSetDefault extends BaseNode {
  type: "alter_action_set_default";
  setDefaultKw: [Keyword<"SET">, Keyword<"DEFAULT">];
  expr: Expr;
}

export interface AlterActionDropDefault extends BaseNode {
  type: "alter_action_drop_default";
  dropDefaultKw: [Keyword<"DROP">, Keyword<"DEFAULT">];
}

export interface AlterActionSetNotNull extends BaseNode {
  type: "alter_action_set_not_null";
  setNotNullKw: [Keyword<"SET">, Keyword<"NOT">, Keyword<"NULL">];
}

export interface AlterActionDropNotNull extends BaseNode {
  type: "alter_action_drop_not_null";
  dropNotNullKw: [Keyword<"DROP">, Keyword<"NOT">, Keyword<"NULL">];
}

export interface AlterActionSetDataType extends BaseNode {
  type: "alter_action_set_data_type";
  setDataTypeKw:
    | [Keyword<"SET">, Keyword<"DATA">, Keyword<"TYPE">]
    | Keyword<"TYPE">;
  dataType: DataType;
}

// MySQL only
export interface AlterActionSetVisible extends BaseNode {
  type: "alter_action_set_visible";
  setVisibleKw: [Keyword<"SET">, Keyword<"VISIBLE">];
}

// MySQL only
export interface AlterActionSetInvisible extends BaseNode {
  type: "alter_action_set_invisible";
  setInvisibleKw: [Keyword<"SET">, Keyword<"INVISIBLE">];
}
