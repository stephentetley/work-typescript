

type Scalings = Record<string, {easting: number, northing: number}>;


let enMajor: Scalings = {
  'S' : {easting: 0, northing: 0},
  'T' : {easting: 500_000, northing: 0},
  'N' : {easting: 0, northing: 500_000},
  'O' : {easting: 500_000, northing: 500_000},
  'H' : {easting: 0, northing: 1_000_000}, 
};

let enMinor: Scalings = {
  'A' : {easting: 0, northing: 400_000},
  'B' : {easting: 100_000, northing: 400_000},
  'C' : {easting: 200_000, northing: 400_000},
  'D' : {easting: 300_000, northing: 400_000},
  'E' : {easting: 400_000, northing: 400_000},
  'F' : {easting: 0, northing: 300_000},
  'G' : {easting: 100_000, northing: 300_000},
  'H' : {easting: 200_000, northing: 300_000},
  'J' : {easting: 300_000, northing: 300_000},
  'K' : {easting: 400_000, northing: 300_000},
  'L' : {easting: 0, northing: 200_000},
  'M' : {easting: 100_000, northing: 200_000},
  'N' : {easting: 200_000, northing: 200_000},
  'O' : {easting: 300_000, northing: 200_000},
  'P' : {easting: 400_000, northing: 200_000},
  'Q' : {easting: 0, northing: 100_000},
  'R' : {easting: 100_000, northing: 100_000},
  'S' : {easting: 200_000, northing: 100_000},
  'T' : {easting: 300_000, northing: 100_000},
  'U' : {easting: 400_000, northing: 100_000},
  'V' : {easting: 0, northing: 0},
  'W' : {easting: 100_000, northing: 0},
  'X' : {easting: 200_000, northing: 0},
  'Y' : {easting: 300_000, northing: 0},
  'Z' : {easting: 400_000, northing: 0}
};


export function toEastingNorthing(osgb: string): [number, number] {
  let majorChar = osgb.charAt(0).toUpperCase();
  let minorChar = osgb.charAt(1).toUpperCase();
  let major = enMajor[majorChar];
  let minor = enMinor[minorChar];
  let east1 = Number(osgb.slice(2, 7));
  let north1 = Number(osgb.slice(7, 12));
  return [major.easting + minor.easting + east1, major.northing + minor.northing + north1]
};

