import peggy from "peggy";
import tspegjs from "ts-pegjs";
import fs from "fs";
import path from "path";

const source = fs.readFileSync(
  path.resolve(__dirname, "./src/parser.pegjs"),
  "utf-8"
);

console.log(`Generating parser...`);

const parser = peggy.generate(source, {
  plugins: [tspegjs],
  output: "source",
  format: "commonjs",
  tspegjs: {
    customHeader: `
      import {
        identity,
        createBinaryExprChain,
        createBinaryExpr,
        createCompoundSelectStmtChain,
        createJoinExprChain,
        createPrefixOpExpr,
        createPostfixOpExpr,
        createKeyword,
        readCommaSepList,
        readSpaceSepList,
        createIdentifier,
        createAlias,
        createParenExpr,
        createExprList,
      } from "./grammar_utils";
      import {
        trailing,
        surrounding,
      } from "./utils/whitespace";
      import { read } from "./utils/read";
      import {
        setRangeFunction,
        setOptionsFunction,
        isMysql,
        isSqlite,
        hasParamType,
        isEnabledWhitespace,
      } from "./utils/parserState";
      import { isReservedKeyword } from "./utils/keywords";
      import { loc } from "./utils/loc";
    `,
  },
} as peggy.SourceBuildOptions<"source">);

fs.writeFileSync(path.resolve(__dirname, `./src/parser.ts`), parser);
