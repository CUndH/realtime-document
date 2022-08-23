// const db = require("../common/sql");
const RunSQL = require("../common/utils");

async function SelectTableData(params) {
  const { start, end } = params;

  const rowSql = `SELECT * FROM real_table WHERE type = 1 ORDER BY sort ASC Limit ${end} OFFSET ${start} `;

  const rowResult = await RunSQL(rowSql);

  if (!rowResult.length) {
    return [];
  }

  const rowIDs = rowResult.map((item) => item.id).join(",");

  const colSql = `SELECT * FROM real_table WHERE row_id IN (${rowIDs}) AND type = 2 ORDER BY col_id ASC`;

  const colResult = await RunSQL(colSql);

  const rowList = rowResult.map((item) => {
    const children = colResult.filter((col) => col.row_id === item.id);

    return {
      ...item,
      children,
    };
  }, []);

  return rowList;
}

async function AddTableData(params) {
  const { row_id, row_sort, col_id, content, style } = params;

  const rowSql = `INSERT INTO real_table VALUES(${end})`;

  const rowResult = await RunSQL(rowSql);

  return rowResult;
}

module.exports = {
  SelectTableData,
  AddTableData,
};
