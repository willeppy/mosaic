import { Spec } from '@uwdata/mosaic-spec';

export const spec : Spec = {
  "meta": {
    "title": "Overview + Detail",
    "description": "Select the top \"overview\" series to zoom the \"focus\" view below. An `intervalX` interactor updates a selection that filters the focus view. The `line` and `area` marks can apply [M4](https://observablehq.com/@uwdata/m4-scalable-time-series-visualization) optimization to reduce the number of data points returned: rather than draw all points, a dramatically smaller subset can still faithfully represent these area charts.\n"
  },
  "data": {
    "walk": {
      "file": "data/random-walk.parquet"
    }
  },
  "vconcat": [
    {
      "plot": [
        {
          "mark": "areaY",
          "data": {
            "from": "walk"
          },
          "x": "t",
          "y": "v",
          "fill": "steelblue"
        },
        {
          "select": "intervalX",
          "as": "$brush"
        }
      ],
      "width": 680,
      "height": 200
    },
    {
      "plot": [
        {
          "mark": "areaY",
          "data": {
            "from": "walk",
            "filterBy": "$brush"
          },
          "x": "t",
          "y": "v",
          "fill": "steelblue"
        }
      ],
      "yDomain": "Fixed",
      "width": 680,
      "height": 200
    }
  ]
};
