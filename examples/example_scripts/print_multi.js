import * as vg from "@uwdata/vgplot";

export default async function getPlot(conn_type) {
  const datasetName = "athletes";
  const filename = "data/athletes.csv";
  let file_path = filename;

  if (conn_type === "wasm") {
    file_path = location.origin + "/" + filename;
  }
  await vg.coordinator().exec(vg.loadCSV(datasetName, file_path));

  const $query = vg.Selection.crossfilter();
  const $selectNationality = vg.Selection.single();
  const $selectSport = vg.Selection.single();

  function printValue() {
    // let r = $query.clauses.map((clause) => {
    //   return {
    //     columnNames: clause.predicate.columns,
    //     values: clause.value,
    //   };
    // });

    let r = $query.clauses.reduce((d, clause) => {
      let colName = clause.predicate.columns[0];
      let val = clause.value.flat();
      d[colName] = val;
      return d;
    }, {});

    console.log("query clause s", JSON.stringify(r));
  }

  $query.addEventListener("value", printValue);

  return vg.vconcat(
    vg.plot(
      vg.barX(vg.from(datasetName, { filterBy: $query }), {
        x: vg.count(),
        y: "nationality",
        order: "nationality",
        sort: { y: "-x", limit: 10 },
      }),
      vg.highlight({ by: $selectNationality }),
      vg.toggleY({ as: $selectNationality }),
      // vg.toggleY({ as: $query, width: 600, height: 400 }),
      vg.toggleY({ as: $query }),
      vg.marginLeft(80),
      vg.height(200)
    ),
    vg.vspace(10),
    vg.plot(
      vg.barX(vg.from(datasetName, { filterBy: $query }), {
        x: vg.count(),
        y: "sport",
        order: "sport",
        sort: { y: "-x", limit: 10 },
      }),
      vg.highlight({ by: $selectSport }),
      vg.toggleY({ as: $selectSport }),
      vg.toggleY({ as: $query, width: 600, height: 400 }),
      vg.marginLeft(80),
      vg.height(200)
    ),
    vg.vspace(10),
    // histogram of height
    vg.plot(
      vg.rectY(vg.from(datasetName, { filterBy: $query }), {
        x: vg.bin("height"),
        y: vg.count(),
        inset: 0.5,
      }),
      vg.intervalX({ as: $query }),
      vg.xDomain(vg.Fixed),
      vg.marginLeft(80),
      vg.height(200)
    ),
    vg.vspace(10),
    // histogram of weight
    vg.plot(
      vg.rectY(vg.from(datasetName, { filterBy: $query }), {
        x: vg.bin("weight"),
        y: vg.count(),
        inset: 0.5,
      }),
      vg.intervalX({ as: $query }),
      vg.xDomain(vg.Fixed),
      vg.marginLeft(80),
      vg.height(200)
    )
  );
}
