import { Spec } from '@uwdata/mosaic-spec';

export const spec : Spec = {
  "meta": {
    "title": "Scatter Plot Matrix (SPLOM)",
    "description": "A scatter plot matrix enables inspection of pairwise bivariate distributions. Do points cluster or separate in some dimensions but not others? Select a region to highlight corresponding points across all plots.\n"
  },
  "data": {
    "penguins": {
      "file": "data/penguins.parquet"
    }
  },
  "params": {
    "brush": {
      "select": "single"
    }
  },
  "plotDefaults": {
    "xTicks": 3,
    "yTicks": 4,
    "xDomain": "Fixed",
    "yDomain": "Fixed",
    "colorDomain": "Fixed",
    "marginTop": 5,
    "marginBottom": 10,
    "marginLeft": 10,
    "marginRight": 5,
    "xAxis": null,
    "yAxis": null,
    "xLabelAnchor": "center",
    "yLabelAnchor": "center",
    "xTickFormat": "s",
    "yTickFormat": "s",
    "width": 150,
    "height": 150
  },
  "vconcat": [
    {
      "hconcat": [
        {
          "plot": [
            {
              "mark": "frame",
              "stroke": "#ccc"
            },
            {
              "mark": "dot",
              "data": {
                "from": "penguins"
              },
              "x": "bill_length",
              "y": "body_mass",
              "fill": "species",
              "r": 2
            },
            {
              "select": "intervalXY",
              "as": "$brush"
            },
            {
              "select": "highlight",
              "by": "$brush",
              "opacity": 0.1
            }
          ],
          "yAxis": "left",
          "marginLeft": 45,
          "width": 185
        },
        {
          "plot": [
            {
              "mark": "frame",
              "stroke": "#ccc"
            },
            {
              "mark": "dot",
              "data": {
                "from": "penguins"
              },
              "x": "bill_depth",
              "y": "body_mass",
              "fill": "species",
              "r": 2
            },
            {
              "select": "intervalXY",
              "as": "$brush"
            },
            {
              "select": "highlight",
              "by": "$brush",
              "opacity": 0.1
            }
          ]
        },
        {
          "plot": [
            {
              "mark": "frame",
              "stroke": "#ccc"
            },
            {
              "mark": "dot",
              "data": {
                "from": "penguins"
              },
              "x": "flipper_length",
              "y": "body_mass",
              "fill": "species",
              "r": 2
            },
            {
              "select": "intervalXY",
              "as": "$brush"
            },
            {
              "select": "highlight",
              "by": "$brush",
              "opacity": 0.1
            }
          ]
        },
        {
          "plot": [
            {
              "mark": "frame",
              "stroke": "#ccc"
            },
            {
              "mark": "dot",
              "data": {
                "from": "penguins"
              },
              "x": "body_mass",
              "y": "body_mass",
              "fill": "species",
              "r": 2
            },
            {
              "select": "intervalXY",
              "as": "$brush"
            },
            {
              "select": "highlight",
              "by": "$brush",
              "opacity": 0.1
            }
          ]
        }
      ]
    },
    {
      "hconcat": [
        {
          "plot": [
            {
              "mark": "frame",
              "stroke": "#ccc"
            },
            {
              "mark": "dot",
              "data": {
                "from": "penguins"
              },
              "x": "bill_length",
              "y": "flipper_length",
              "fill": "species",
              "r": 2
            },
            {
              "select": "intervalXY",
              "as": "$brush"
            },
            {
              "select": "highlight",
              "by": "$brush",
              "opacity": 0.1
            }
          ],
          "yAxis": "left",
          "marginLeft": 45,
          "width": 185
        },
        {
          "plot": [
            {
              "mark": "frame",
              "stroke": "#ccc"
            },
            {
              "mark": "dot",
              "data": {
                "from": "penguins"
              },
              "x": "bill_depth",
              "y": "flipper_length",
              "fill": "species",
              "r": 2
            },
            {
              "select": "intervalXY",
              "as": "$brush"
            },
            {
              "select": "highlight",
              "by": "$brush",
              "opacity": 0.1
            }
          ]
        },
        {
          "plot": [
            {
              "mark": "frame",
              "stroke": "#ccc"
            },
            {
              "mark": "dot",
              "data": {
                "from": "penguins"
              },
              "x": "flipper_length",
              "y": "flipper_length",
              "fill": "species",
              "r": 2
            },
            {
              "select": "intervalXY",
              "as": "$brush"
            },
            {
              "select": "highlight",
              "by": "$brush",
              "opacity": 0.1
            }
          ]
        },
        {
          "plot": [
            {
              "mark": "frame",
              "stroke": "#ccc"
            },
            {
              "mark": "dot",
              "data": {
                "from": "penguins"
              },
              "x": "body_mass",
              "y": "flipper_length",
              "fill": "species",
              "r": 2
            },
            {
              "select": "intervalXY",
              "as": "$brush"
            },
            {
              "select": "highlight",
              "by": "$brush",
              "opacity": 0.1
            }
          ]
        }
      ]
    },
    {
      "hconcat": [
        {
          "plot": [
            {
              "mark": "frame",
              "stroke": "#ccc"
            },
            {
              "mark": "dot",
              "data": {
                "from": "penguins"
              },
              "x": "bill_length",
              "y": "bill_depth",
              "fill": "species",
              "r": 2
            },
            {
              "select": "intervalXY",
              "as": "$brush"
            },
            {
              "select": "highlight",
              "by": "$brush",
              "opacity": 0.1
            }
          ],
          "yAxis": "left",
          "marginLeft": 45,
          "width": 185
        },
        {
          "plot": [
            {
              "mark": "frame",
              "stroke": "#ccc"
            },
            {
              "mark": "dot",
              "data": {
                "from": "penguins"
              },
              "x": "bill_depth",
              "y": "bill_depth",
              "fill": "species",
              "r": 2
            },
            {
              "select": "intervalXY",
              "as": "$brush"
            },
            {
              "select": "highlight",
              "by": "$brush",
              "opacity": 0.1
            }
          ]
        },
        {
          "plot": [
            {
              "mark": "frame",
              "stroke": "#ccc"
            },
            {
              "mark": "dot",
              "data": {
                "from": "penguins"
              },
              "x": "flipper_length",
              "y": "bill_depth",
              "fill": "species",
              "r": 2
            },
            {
              "select": "intervalXY",
              "as": "$brush"
            },
            {
              "select": "highlight",
              "by": "$brush",
              "opacity": 0.1
            }
          ]
        },
        {
          "plot": [
            {
              "mark": "frame",
              "stroke": "#ccc"
            },
            {
              "mark": "dot",
              "data": {
                "from": "penguins"
              },
              "x": "body_mass",
              "y": "bill_depth",
              "fill": "species",
              "r": 2
            },
            {
              "select": "intervalXY",
              "as": "$brush"
            },
            {
              "select": "highlight",
              "by": "$brush",
              "opacity": 0.1
            }
          ]
        }
      ]
    },
    {
      "hconcat": [
        {
          "plot": [
            {
              "mark": "frame",
              "stroke": "#ccc"
            },
            {
              "mark": "dot",
              "data": {
                "from": "penguins"
              },
              "x": "bill_length",
              "y": "bill_length",
              "fill": "species",
              "r": 2
            },
            {
              "select": "intervalXY",
              "as": "$brush"
            },
            {
              "select": "highlight",
              "by": "$brush",
              "opacity": 0.1
            }
          ],
          "yAxis": "left",
          "xAxis": "bottom",
          "marginLeft": 45,
          "marginBottom": 35,
          "width": 185,
          "height": 175
        },
        {
          "plot": [
            {
              "mark": "frame",
              "stroke": "#ccc"
            },
            {
              "mark": "dot",
              "data": {
                "from": "penguins"
              },
              "x": "bill_depth",
              "y": "bill_length",
              "fill": "species",
              "r": 2
            },
            {
              "select": "intervalXY",
              "as": "$brush"
            },
            {
              "select": "highlight",
              "by": "$brush",
              "opacity": 0.1
            }
          ],
          "xAxis": "bottom",
          "height": 175,
          "marginBottom": 35
        },
        {
          "plot": [
            {
              "mark": "frame",
              "stroke": "#ccc"
            },
            {
              "mark": "dot",
              "data": {
                "from": "penguins"
              },
              "x": "flipper_length",
              "y": "bill_length",
              "fill": "species",
              "r": 2
            },
            {
              "select": "intervalXY",
              "as": "$brush"
            },
            {
              "select": "highlight",
              "by": "$brush",
              "opacity": 0.1
            }
          ],
          "xAxis": "bottom",
          "height": 175,
          "marginBottom": 35
        },
        {
          "plot": [
            {
              "mark": "frame",
              "stroke": "#ccc"
            },
            {
              "mark": "dot",
              "data": {
                "from": "penguins"
              },
              "x": "body_mass",
              "y": "bill_length",
              "fill": "species",
              "r": 2
            },
            {
              "select": "intervalXY",
              "as": "$brush"
            },
            {
              "select": "highlight",
              "by": "$brush",
              "opacity": 0.1
            }
          ],
          "xAxis": "bottom",
          "height": 175,
          "marginBottom": 35
        }
      ]
    }
  ]
};
