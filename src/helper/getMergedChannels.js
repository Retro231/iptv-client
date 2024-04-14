export const getMergedChannels = async (newArray, storedArray) => {
  const mergedArray = [];

  // Create a map from the storedArray for easy lookup
  const storedMap = new Map();
  storedArray.forEach(item => {
    storedMap.set(item.tvgId, item);
  });

  // Iterate over the newArray
  newArray.forEach(newItem => {
    // Check if there is a corresponding item in the storedArray
    if (storedMap.has(newItem.tvgId)) {
      const storedItem = storedMap.get(newItem.tvgId);
      const mergedItem = {...newItem};

      // Check if the storedItem has the 'favourite' property
      if ('favourite' in storedItem) {
        mergedItem.favourite = storedItem.favourite;
      }

      mergedArray.push(mergedItem);
    } else {
      // If there's no corresponding item in storedArray, just add the newItem to the mergedArray
      mergedArray.push(newItem);
    }
  });

  // Append items from storedArray that are not in newArray
  storedArray.forEach(storedItem => {
    if (!mergedArray.some(item => item.tvgId === storedItem.tvgId)) {
      mergedArray.push(storedItem);
    }
  });

  // console.log('marged');

  return mergedArray;
};
