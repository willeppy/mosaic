import * as vg from "@uwdata/vgplot";

export default async function getPlot(conn_type) {
  const filename = "data/athletes.csv";
  let file_path = filename;

  if (conn_type === "wasm") {
    file_path = location.origin + "/" + filename;
  }

  await vg.coordinator().exec(vg.loadCSV("athletes", file_path));

  const $query = vg.Selection.crossfilter();
  const $selectNationality = vg.Selection.single();
  const $selectSport = vg.Selection.single();

  return vg.vconcat(
    vg.plot(
      vg.barX(vg.from("athletes", { filterBy: $query }), {
        x: vg.count(),
        y: "nationality",
        order: "nationality",
        sort: { y: "-x", limit: 10 },
      }),
      vg.highlight({ by: $selectNationality }),
      vg.toggleY({ as: $selectNationality }),
      vg.toggleY({ as: $query, width: 600, height: 400 }),
      vg.marginLeft(80)
    ),
    vg.vspace(10),
    vg.plot(
      vg.barX(vg.from("athletes", { filterBy: $query }), {
        x: vg.count(),
        y: "sport",
        order: "sport",
        sort: { y: "-x", limit: 10 },
      }),
      vg.highlight({ by: $selectSport }),
      vg.toggleY({ as: $selectSport }),
      vg.toggleY({ as: $query, width: 600, height: 400 }),
      vg.marginLeft(80)
    )
  );
}
