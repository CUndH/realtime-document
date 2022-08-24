const dayjs = require("dayjs");
const RunSQL = require("../common/utils");

async function SelectTableData(params) {
  const { start, end } = params;

  const rowSql = `SELECT * FROM real_table WHERE type = 1 ORDER BY sort ASC Limit ${end} OFFSET ${start} `;

  const rowResult = await RunSQL(rowSql);

  if (!rowResult.length) {
    return [];
  }

  const rowIDs = rowResult.map((item) => item.id).join(",");

  const colSql = `SELECT * FROM real_table WHERE row_id IN (${rowIDs}) AND type = 2 ORDER BY col_sort ASC`;

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

async function UpdateTableData(params) {
  const { row_id, row_sort, col_id, col_sort, content, style, mode } = params;

  let row = { id: row_id };

  let rowResult, colResult;

  const time = dayjs().format("YYYY-MM-DD HH:mm:ss");

  if (!row_id) {
    const rowSql = `INSERT INTO real_table (type,sort,create_time) VALUES (1,${row_sort},'${time}')`;

    const rowData = await RunSQL(rowSql);

    row = { ...rowData, id: rowData.insertId };

    rowResult = true;
  }

  if (col_id || col_sort) {
    colResult = false;
    let colData;

    if (!col_id) {
      // const time = dayjs().format('YYYY-MM-DD HH:mm:ss')

      const colSql = `INSERT INTO real_table (type,row_id,col_sort,content,style,create_time) VALUES (2,${row.id},${col_sort},'${content}','${style}','${time}')`;

      colData = await RunSQL(colSql);

      colResult = true;
    } else {
      // const time = dayjs().format('YYYY-MM-DD HH:mm:ss')

      const colSql = `UPDATE real_table SET content = '${content}', style = '${style}', update_time = '${time}' WHERE id = ${col_id}`;

      colData = await RunSQL(colSql);

      colResult = true;
    }

    return rowResult && colResult;
  }
}

module.exports = {
  SelectTableData,
  UpdateTableData,
};
