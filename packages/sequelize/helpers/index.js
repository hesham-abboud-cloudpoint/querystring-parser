function mergeAlliance(includeWithAlias, key) {
  if (includeWithAlias[key].alias.length > 0) {
    let updatedIncludeWithAlias = includeWithAlias;
    includeWithAlias[key].alias.forEach((alias) => {
      const { value, updatedAlias } = mergeAlliance(
        updatedIncludeWithAlias,
        alias
      );
      updatedAlias[key].include = [...updatedAlias[key].include, value];
      updatedIncludeWithAlias = updatedAlias;
    });
    delete updatedIncludeWithAlias[key].alias;
    return {
      value: updatedIncludeWithAlias[key],
      updatedAlias: updatedIncludeWithAlias,
    };
  } else {
    const value = includeWithAlias[key];
    delete includeWithAlias[key].alias;
    return {
      value,
      updatedAlias: includeWithAlias,
    };
  }
}

function splitArray(arr) {
  const splittedArray = arr.split(".");
  return splittedArray;
}

module.exports = {
  splitArray,
  mergeAlliance,
};
