import { check } from "k6";
import sql from "k6/x/sql";

function selectQueryResponseFromDB(db, query) {
  const result = sql.query(db, query);
  JSON.stringify(result);
  check(result, {
    "Database Query Success": (result) => result != "",
  });
}

function dbInsertQuery(db, query) {
  const result = sql.query(db, query);
  check(result, {
    "Database Query Success": (result) => result == "",
  });
}

module.exports = { selectQueryResponseFromDB, dbInsertQuery };
