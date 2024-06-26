import { Spec } from '@uwdata/mosaic-spec';

export const spec : Spec = {
  "meta": {
    "title": "U.S. Counties",
    "description": "A map of U.S. counties. County name tooltips are anchored to invisible centroid dot marks. Requires the DuckDB `spatial` extension.\n"
  },
  "data": {
    "counties": {
      "type": "spatial",
      "file": "data/us-counties-10m.json",
      "layer": "counties"
    },
    "states": {
      "type": "spatial",
      "file": "data/us-counties-10m.json",
      "layer": "states"
    }
  },
  "plot": [
    {
      "mark": "geo",
      "data": {
        "from": "counties"
      },
      "stroke": "currentColor",
      "strokeWidth": 0.25
    },
    {
      "mark": "geo",
      "data": {
        "from": "states"
      },
      "stroke": "currentColor",
      "strokeWidth": 1
    },
    {
      "mark": "dot",
      "data": {
        "from": "counties"
      },
      "x": {
        "centroidX": "geom"
      },
      "y": {
        "centroidY": "geom"
      },
      "r": 2,
      "fill": "transparent",
      "tip": true,
      "title": "name"
    }
  ],
  "margin": 0,
  "projectionType": "albers"
};
