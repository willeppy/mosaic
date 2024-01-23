import * as vg from "@uwdata/vgplot";

function formatPath(path, conn_type) {
  if (conn_type === "wasm") {
    return location.origin + "/" + path;
  } else {
    return path;
  }
}

export default async function getPlot(conn_type) {
  const datasets = [
    {
      name: "wordTable",
      path: "data/word.parquet",
    },

    {
      name: "mainTable",
      path: "data/mainTable.parquet",
    },
  ];

  for (let i = 0; i < datasets.length; i++) {
    let ds = datasets[i];

    await vg
      .coordinator()
      .exec(vg.loadParquet(ds.name, formatPath(ds.path, conn_type)));
  }

  const $query = vg.Selection.crossfilter();
  const $selectWord = vg.Selection.single();
  const $selectCat = vg.Selection.single();
  // const $selectCat2 = vg.Selection.single();

  const LIMIT_N = 35;
  const chartHeight = 400;
  const marginL = 150;

  /**
   * 
   * This works for the charts but does not for the table becuase needs just the table name;
   * Can probably make a change to the table code to handle this better?
   * 
   */
  function getSQLString({ table, rightTable, joinKey }) {
    let q2 = vg.sql`SELECT DISTINCT ON (${vg.column(
      joinKey
    )}) * FROM ${vg.column(rightTable)}`;

    return vg.sql`(SELECT ${vg.column(table)}.* EXCLUDE ${vg.column(
      joinKey
    )}, _joinTable.* FROM ${vg.column(
      table
    )} JOIN (${q2}) _joinTable ON ${vg.column(table)}.${vg.column(
      joinKey
    )} = _joinTable.${vg.column(joinKey)})`;
  }

  let l = getSQLString({table: "wordTable", rightTable: "mainTable", joinKey: "id"})


  return vg.hconcat(
    vg.vconcat(
      vg.plot(
        vg.barX(
          vg.from(vg.fromJoinDistinct({table: "wordTable", rightTable: "mainTable", joinKey: "id"}), {
            filterBy: $query,
          }),
          {
            x: vg.count(),
            y: "word",
            order: "word",
            sort: { y: "-x", limit: LIMIT_N },
          }
        ),
        vg.highlight({ by: $selectWord }),
        vg.toggleY({ as: $selectWord }),
        vg.toggleY({ as: $query }),
        vg.marginLeft(marginL),
        vg.height(chartHeight)
      ),
      vg.plot(
        vg.barX(
          vg.from(vg.fromJoinDistinct({table: "mainTable", rightTable: "wordTable", joinKey: "id"}), {
            filterBy: $query,
          }),
          {
            x: vg.count(),
            y: "type",
            order: "type",
            sort: { y: "-x", limit: LIMIT_N },
          }
        ),
        vg.highlight({ by: $selectCat }),
        vg.toggleY({ as: $query }),
        vg.toggleY({ as: $selectCat }),
        vg.marginLeft(marginL),
        vg.height(chartHeight)
      ),
    ),
    vg.hspace(50),
    vg.table({
      from: vg.fromJoinDistinct({table: "mainTable", rightTable: "wordTable", joinKey: "id"}),
      filterBy: $query,
      maxWidth: 750,
      height: 900,
      width: { id: 20, message: 300, type: 50, author: 100, date: 100 },
    })
  );
}
