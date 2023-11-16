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
      name: "characterTable",
      path: "data/character.parquet",
    },
    {
      name: "wordTable",
      path: "data/word.parquet",
    },
    {
      name: "sentenceTable",
      path: "data/sentence.parquet",
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
  const $selectChar = vg.Selection.single();
  const $selectWord = vg.Selection.single();
  const $selectSent = vg.Selection.single();

  const LIMIT_N = 35;
  const chartHeight = 400;
  const marginL = 150;

  return vg.hconcat(
    vg.vconcat(
      vg.plot(
        vg.barX(vg.from("characterTable", { filterBy: $query }), {
          x: vg.count(),
          y: "character",
          order: "character",
          sort: { y: "-x", limit: LIMIT_N },
        }),
        vg.highlight({ by: $selectChar }),
        vg.toggleY({ as: $selectChar }),
        vg.toggleY({ as: $query }),
        vg.marginLeft(marginL),
        vg.height(chartHeight)
      ),
      vg.vspace(10),
      vg.plot(
        vg.barX(vg.from("wordTable", { filterBy: $query }), {
          x: vg.count(),
          y: "word",
          order: "word",
          sort: { y: "-x", limit: LIMIT_N },
        }),
        vg.highlight({ by: $selectWord }),
        vg.toggleY({ as: $selectWord }),
        vg.toggleY({ as: $query }),
        vg.marginLeft(marginL),
        vg.height(chartHeight)
      ),
      vg.vspace(10),
      vg.plot(
        vg.barX(vg.from("sentenceTable", { filterBy: $query }), {
          x: vg.count(),
          y: "sentence",
          order: "sentence",
          sort: { y: "-x", limit: LIMIT_N },
        }),
        vg.highlight({ by: $selectSent }),
        vg.toggleY({ as: $selectSent }),
        vg.toggleY({ as: $query }),
        vg.marginLeft(marginL),
        vg.height(chartHeight)
      )
    ),

    vg.hspace(50),

    vg.table({
      from: "mainTable",
      filterBy: $query,
      maxWidth: 750,
      height: 900,
      width: { id: 20, message: 300, type: 50, author: 100, date: 100 },
    })
  );
}
