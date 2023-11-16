import * as vg from "@uwdata/vgplot";

// HELP: how to re-execute this query when cross filter updates and display?
async function getCount(datasetName, selection) {
  // let q = vg.sql`summarize ${datasetName}`;
  // let q = "show tables;";
  // let q = vg.Query.from(datasetName).select({ list: "nationality" }).distinct();

  let q = vg.Query.from(datasetName).select({ count: vg.count() });

  if (selection) {
    q = q.where(selection.predicate());
  }
  console.log("Query is: ", q);
  let r = await vg.coordinator().query(q, { type: "json" });
  // returned object is arrow, can generate an object somehow
  console.log("result is: ", r);
  return r;
}

export default async function getPlot(conn_type) {
  // other dataset is vast2021, "data/vast2021.parquet"
  const datasetName = "vast2021";
  const columnName = "location";
  const filename = "data/vast2021.parquet";
  let file_path = filename;

  if (conn_type === "wasm") {
    file_path = location.origin + "/" + filename;
  }

  await vg.coordinator().exec(vg.loadParquet(datasetName, file_path));

  let viewName = `${datasetName}NoNulls${columnName}`;

  await vg
    .coordinator()
    .exec(
      vg.sql`create view if not exists ${viewName} as select * from ${datasetName} where ${columnName} is not null;`
    );

  const $query = vg.Selection.crossfilter();
  const $selectNationality = vg.Selection.single();
  const $selectTwo = vg.Selection.single();

  $query.addEventListener("value", () => {
    getCount(datasetName, $query);
  });

  getCount(datasetName);

  return vg.vconcat(
    vg.plot(
      vg.barX(vg.from(viewName, { filterBy: $query }), {
        x: vg.count(),
        // y: "author",
        // order: "author",
        y: columnName,
        order: columnName,
        sort: { y: "-x", limit: 10 },
      }),
      vg.highlight({ by: $selectNationality }),
      vg.toggleY({ as: $selectNationality }),
      vg.toggleY({ as: $query, width: 600, height: 400 }),
      vg.text(vg.from(viewName, { filterBy: $query }), {
        x: vg.count(),
        y: columnName,
        order: columnName,
        sort: { y: "-x", limit: 10 },
        text: vg.count(),
        dx: 5,
        textAnchor: "start",
      }),
      vg.marginLeft(80)
    ),
    vg.plot(
      vg.barX(vg.from(datasetName, { filterBy: $query }), {
        x: vg.count(),
        // y: "author",
        // order: "author",
        y: "author",
        order: "author",
        sort: { y: "-x", limit: 10 },
      }),
      vg.highlight({ by: $selectTwo }),
      vg.toggleY({ as: $selectTwo }),
      vg.toggleY({ as: $query, width: 600, height: 400 }),
      vg.marginLeft(80)
    )
  );
}
