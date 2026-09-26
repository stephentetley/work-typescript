

export class InvalidEastingNorthingError extends RangeError {}


function findMajor(e: number, n: number): string | null {
  if (       e >= 0       && e < 500_000   &&  n >= 0        && n < 500_000) {
      return 'S'
  } else if (e >= 500_000 && e < 1_000_000 && n >= 0         && n < 500_000) {
      return 'T'
  } else if (e >= 0       && e < 500_000   && n >= 500_000   && n < 1_000_000) {
        return 'N'
  } else if (e >= 500_000 && e < 1_000_000 && n >= 500_000   && n < 1_000_000) {
      return 'O'
  } else if (e >= 0       && e < 500_000   && n >= 1_000_000 && n < 1_500_000) {
      return 'H'
  } else if (e >= 500_000 && e < 1_000_000 && n >= 1_000_000 && n < 1_500_000) {
      return 'J'
  } else {
      return null
  }
}

function findMinor(e: number, n: number): string | null {
    if   (e >= 0       && e < 100_000     && n >= 0       && n < 100_000) { 
        return 'V'
    } else if(e >= 100_000 && e < 200_000     && n >= 0       && n < 100_000) {
        return 'W'
    } else if(e >= 200_000 && e < 300_000     && n >= 0       && n < 100_000) {
        return 'X'
    } else if(e >= 300_000 && e < 400_000     && n >= 0       && n < 100_000) {
        return 'Y'
    } else if(e >= 400_000 && e < 500_000     && n >= 0       && n < 100_000) {
        return 'Z'
    } else if(e >= 0       && e < 100_000     && n >= 100_000 && n < 200_000) {
        return 'Q'
    } else if(e >= 100_000 && e < 200_000     && n >= 100_000 && n < 200_000) {
        return 'R'
    } else if(e >= 200_000 && e < 300_000     && n >= 100_000 && n < 200_000) {
        return 'S'
    } else if(e >= 300_000 && e < 400_000     && n >= 100_000 && n < 200_000) {
        return 'T'
    } else if(e >= 400_000 && e < 500_000     && n >= 100_000 && n < 200_000) {
        return 'U'
    } else if(e >= 0       && e < 100_000     && n >= 200_000 && n < 300_000) {
        return 'L'
    } else if(e >= 100_000 && e < 200_000     && n >= 200_000 && n < 300_000) {
        return 'M'
    } else if(e >= 200_000 && e < 300_000     && n >= 200_000 && n < 300_000) {
        return 'N'
    } else if(e >= 300_000 && e < 400_000     && n >= 200_000 && n < 300_000) {
        return 'O'
    } else if(e >= 400_000 && e < 500_000     && n >= 200_000 && n < 300_000) {
        return 'P'
    } else if(e >= 0       && e < 100_000     && n >= 300_000 && n < 400_000) {
        return 'F'
    } else if(e >= 100_000 && e < 200_000     && n >= 300_000 && n < 400_000) {
        return 'G'
    } else if(e >= 200_000 && e < 300_000     && n >= 300_000 && n < 400_000) {
        return 'H'
    } else if(e >= 300_000 && e < 400_000     && n >= 300_000 && n < 400_000) {
        return 'J'
    } else if(e >= 400_000 && e < 500_000     && n >= 300_000 && n < 400_000) {
        return 'K'
    } else if(e >= 0       && e < 100_000     && n >= 400_000 && n < 500_000) {
        return 'A'
    } else if(e >= 100_000 && e < 200_000     && n >= 400_000 && n < 500_000) {
        return 'B'
    } else if(e >= 200_000 && e < 300_000     && n >= 400_000 && n < 500_000) {
        return 'C'
    } else if(e >= 300_000 && e < 400_000     && n >= 400_000 && n < 500_000) {
        return 'D'
    } else if(e >= 400_000 && e < 500_000     && n >= 400_000 && n < 500_000) {
        return 'E'
  } else {
    return null
  }
};

export function toOSGB36(easting: number, northing: number): string { 
  let majorChar = findMajor(easting, northing);
  let minorChar = findMinor(easting % 500000, northing % 500000);
  if (majorChar !== null && minorChar !== null) {
    let smallE = String(easting % 100000).padStart(5, '0');
    let smallN = String(northing % 100000).padStart(5, '0'); 
    return `${majorChar}${minorChar}${smallE}${smallN}`
  } else {
    throw new InvalidEastingNorthingError('Bad input')
  }
};