const isValidPart = (lexicographical, x) => {
  return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
};

const getBasicCompareValue = (v1parts, v2parts) => {
  for (let i = 0; i < v1parts.length; ++i) {
    if (v2parts.length == i) {
      return 1;
    }

    if (v1parts[i] == v2parts[i]) {
      continue;
    } else if (v1parts[i] > v2parts[i]) {
      return 1;
    } else {
      return -1;
    }
  }
};

export const versionCompare = (v1, v2, options) => {
  let lexicographical = options && options.lexicographical,
    zeroExtend = options && options.zeroExtend,
    v1parts = v1.split('.'),
    v2parts = v2.split('.');

  if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
    return NaN;
  }

  if (zeroExtend) {
    while (v1parts.length < v2parts.length) v1parts.push('0');
    while (v2parts.length < v1parts.length) v2parts.push('0');
  }

  if (!lexicographical) {
    v1parts = v1parts.map(Number);
    v2parts = v2parts.map(Number);
  }

  const basicCompareValue = getBasicCompareValue(v1parts, v2parts);

  if (basicCompareValue) {
    return basicCompareValue;
  } else if (v1parts.length != v2parts.length) {
    return -1;
  }

  return 0;
};

export const removeAccentsWords = str => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
