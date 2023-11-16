import * as vg from "@uwdata/vgplot";

export default async function getPlot(conn_type) {
  const datasetName = "penguins";
  const filename = "data/penguins.csv";
  let file_path = filename;

  if (conn_type === "wasm") {
    file_path = location.origin + "/" + filename;
  }
  await vg.coordinator().exec(vg.loadCSV(datasetName, file_path));

  const $filter = vg.Selection.crossfilter();
  const $select = vg.Selection.single();

  return vg.vconcat(
    vg.hconcat(
      vg.menu({
        label: "Species",
        as: $filter,
        from: "penguins",
        column: "species",
      })
    ),
    vg.vspace(20),
    vg.plot(
      vg.barX(vg.from("penguins", { filterBy: $filter }), { x: vg.count() }),
      vg.name("total"),
      vg.xLabel("Total →"),
      vg.xDomain(vg.Fixed)
    ),
    vg.vspace(20),
    vg.plot(
      vg.barY(vg.from("penguins", { filterBy: $filter }), {
        x: "sex",
        y: vg.count(),
      }),
      vg.highlight({ by: $select }),
      vg.toggleX({ as: $select }),
      vg.toggleX({ as: $filter }),
      vg.text(vg.from("penguins", { filterBy: $filter }), {
        x: "sex",
        y: vg.count(),
        text: vg.count(),
        dy: -10,
      }),
      vg.name("sex"),
      vg.xLabel(null),
      vg.yLabel("Total"),
      vg.xDomain(vg.Fixed),
      vg.yDomain(vg.Fixed)
    )
  );
}
