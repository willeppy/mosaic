import * as vg from "@uwdata/vgplot";

export default async function getPlot(conn_type) {
  await vg
    .coordinator()
    .exec(
      vg.loadObjects("testData", [
        { "colA(1)": 1 },
        { "colA(1)": 2 },
        { "colA(1)": null },
        { "colA(1)": null },
        { "colA(1)": null },
        { "colA(1)": null },
        { "colA(1)": null },
        { "colA(1)": null },
      ])
    );

  let mainDatasetName = "testData";
  let cName = "colA(1)";
  let viewName = `${mainDatasetName}NoNulls${cName}`;

  console.log("viewName: ", viewName);

  let q = vg.sql`create view if not exists ${vg.column(
    viewName
  )} as select * from ${vg.column(mainDatasetName)} where ${vg.column(
    cName
  )} is not null;`;

  console.log("Q: ", String(q));

  await vg.coordinator().exec(q);

  return vg.vconcat(
    vg.plot(
      vg.barX(vg.from(viewName), {
        x: vg.count(),
        y: "colA(1)",
        order: "colA(1)",
      }),
      vg.height(200)
    )
  );
}
