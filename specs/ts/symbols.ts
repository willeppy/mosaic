import { Spec } from '@uwdata/mosaic-spec';

export const spec : Spec = {
  "meta": {
    "title": "Symbol Plots",
    "description": "Two scatter plots with `dot` marks: one with stroked symbols, the other filled.\n"
  },
  "data": {
    "penguins": {
      "file": "data/penguins.parquet"
    }
  },
  "vconcat": [
    {
      "hconcat": [
        {
          "name": "stroked",
          "plot": [
            {
              "mark": "dot",
              "data": {
                "from": "penguins"
              },
              "x": "body_mass",
              "y": "flipper_length",
              "stroke": "species",
              "symbol": "species"
            }
          ],
          "grid": true,
          "xLabel": "Body mass (g) →",
          "yLabel": "↑ Flipper length (mm)"
        },
        {
          "legend": "symbol",
          "for": "stroked",
          "columns": 1
        }
      ]
    },
    {
      "vspace": 20
    },
    {
      "hconcat": [
        {
          "name": "filled",
          "plot": [
            {
              "mark": "dot",
              "data": {
                "from": "penguins"
              },
              "x": "body_mass",
              "y": "flipper_length",
              "fill": "species",
              "symbol": "species"
            }
          ],
          "grid": true,
          "xLabel": "Body mass (g) →",
          "yLabel": "↑ Flipper length (mm)"
        },
        {
          "legend": "symbol",
          "for": "filled",
          "columns": 1
        }
      ]
    }
  ]
};
