import * as vg from "@uwdata/vgplot";

function bins(min, max, options) {
  let { steps = 25, minstep = 0, nice = true } = options;

  if (nice !== false) {
    // use span to determine step size
    const span = max - min;
    const maxb = steps;
    const logb = Math.LN10;
    const level = Math.ceil(Math.log(maxb) / logb);
    let step = Math.max(
      minstep,
      Math.pow(10, Math.round(Math.log(span) / logb) - level)
    );

    // increase step size if too many bins
    while (Math.ceil(span / step) > maxb) {
      step *= 10;
    }

    // decrease step size if allowed
    const div = [5, 2];
    let v;
    for (let i = 0, n = div.length; i < n; ++i) {
      v = step / div[i];
      if (v >= minstep && span / v <= maxb) step = v;
    }

    v = Math.log(step);
    const precision = v >= 0 ? 0 : ~~(-v / logb) + 1;
    const eps = Math.pow(10, -precision - 1);
    v = Math.floor(min / step + eps) * step;
    min = min < v ? v - step : v;
    max = Math.ceil(max / step) * step;
    steps = Math.round((max - min) / step);
  }

  return { min, max, steps };
}

export default async function getPlot(conn_type) {
  const datasetName = "dateData";
  const columnName = "date";
  const filename = "data/dateData.parquet";
  let file_path = filename;

  if (conn_type === "wasm") {
    file_path = location.origin + "/" + filename;
  }

  await vg.coordinator().exec(vg.loadParquet(datasetName, file_path));

  // await vg.coordinator().exec(
  //   vg.loadObjects("testData", [
  //     { left: new Date(2023, 4, 1), right: new Date(2023, 4, 2), count: 4 },
  //     { left: new Date(2023, 4, 2), right: new Date(2023, 4, 3), count: 2 },
  //     { left: new Date(2023, 4, 3), right: new Date(2023, 4, 4), count: 6 },
  //     { left: new Date(2023, 4, 4), right: new Date(2023, 4, 5), count: 7 },
  //   ])
  // );

  // await vg.coordinator().exec(
  //   vg.loadObjects("testData", [
  //     { left: new Date(2023, 4, 1), right: new Date(2023, 5, 1), count: 4 },
  //     { left: new Date(2023, 5, 1), right: new Date(2023, 6, 1), count: 2 },
  //     { left: new Date(2023, 6, 1), right: new Date(2023, 7, 1), count: 6 },
  //     { left: new Date(2023, 7, 1), right: new Date(2023, 8, 1), count: 7 },
  //   ])
  // );

  let $filters = {
    brush: vg.Selection.crossfilter(),
  };

  // TESTING

  // console.log(bins(0, 1000, {}));
  // console.log(bins(0, 100, {}));
  // console.log(bins(0, 10, {}));
  // console.log(bins(new Date(2023, 4, 1), new Date(2023, 5, 1), {}));

  return vg.vconcat(
    vg.plot(
      vg.rectY(vg.from(datasetName, { filterBy: $filters.brush }), {
        x: vg.bin("metric"),
        y: vg.count(),
        fill: "steelblue",
        inset: 0.5,
      }),
      vg.intervalX({ as: $filters.brush }),
      vg.xDomain(vg.Fixed)
    ),
    vg.plot(
      vg.lineY(vg.from(datasetName, { filterBy: $filters.brush }), {
        x: "datesByDAY",
        y: vg.count(),
        stroke: "steelblue",
        curve: "monotone-x",
      }),
      vg.intervalX({ as: $filters.brush }),
      vg.xDomain(vg.Fixed)
    )
  );

  // return vg.vconcat(
  //   vg.plot(
  //     vg.rectY(vg.from(datasetName, { filterBy: $query }), {
  //       x: vg.bin("metric"),
  //       // x: columnName,
  //       y: vg.count(),
  //       fill: "steelblue",
  //       // inset: 0.5,
  //     })

  //     //   vg.rectY(vg.from(datasetName, { filterBy: $query }), {
  //     //     // x: vg.bin(columnName),
  //     //     x: vg.bin(columnName),
  //     //     // x1: "left",
  //     //     // x2: "right",
  //     //     // y: "count",
  //     //     y: vg.count(),
  //     //     fill: "steelblue",
  //     //     inset: 0.5,
  //     //   }),
  //     //   vg.intervalX({ as: $query }),
  //     //   vg.xDomain(vg.Fixed),
  //     //   vg.marginLeft(55),
  //     //   vg.width(600),
  //     //   vg.height(350)
  //   ),
  //   vg.plot(
  //     vg.lineY(vg.from(datasetName, { filterBy: $query }), {
  //       x: columnName,
  //       // x: columnName,
  //       y: "metric",
  //       stroke: "steelblue",
  //       curve: "monotone-x",
  //       marker: "circle",

  //       // inset: 0.5,
  //     })
  //   ),
  //   vg.plot(
  //     vg.lineY(vg.from(datasetName, { filterBy: $query }), {
  //       x: "datesByDAY",
  //       // x: columnName,
  //       y: vg.count(),
  //       stroke: "steelblue",
  //       curve: "monotone-x",
  //       marker: "circle",

  //       // inset: 0.5,
  //     })
  //   ),
  //   vg.plot(
  //     vg.lineY(vg.from(datasetName, { filterBy: $query }), {
  //       x: "datesByMIN",
  //       // x: columnName,
  //       y: vg.count(),
  //       stroke: "steelblue",
  //       curve: "monotone-x",
  //       marker: "circle",

  //       // inset: 0.5,
  //     })
  //   ),
  //   vg.plot(
  //     vg.line(vg.from(datasetName, { filterBy: $query }), {
  //       x: "datesByYEAR",
  //       // x: columnName,
  //       y: vg.count(),
  //       stroke: "steelblue",
  //       curve: "monotone-x",
  //       marker: "circle",

  //       // inset: 0.5,
  //     })
  //   )
  // );
}
