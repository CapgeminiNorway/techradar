import { API } from 'aws-amplify';

export function getWidth() {
  const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth;
  // y = w.innerHeight || e.clientHeight || g.clientHeight;
  return x;
}

export function checkLengthAndSetNull(str) {
  if (str === '') return null;
  else return str;
}

export function getQuadrant(quadrant) {
  switch (quadrant) {
    case 'techniques':
      return 0;
    case 'tools':
      return 1;
    case 'platforms':
      return 2;
    case 'languages':
      return 3;
    default:
      return 0;
  }
}
export function getMovedStatus(changeStatus) {
  switch (changeStatus) {
    case 'same':
      return 0;
    case 'up':
      return 1;
    case 'down':
      return -1;
    default:
      return 0;
  }
}

export function getRing(ring) {
  switch (ring) {
    case 'adopt':
      return 0;
    case 'trial':
      return 1;
    case 'assess':
      return 2;
    case 'hold':
      return 3;
    default:
      return 0;
  }
}

export function getQueryStringValue(key) {
  return decodeURIComponent(
    window.location.search.replace(
      new RegExp(
        '^(?:.*[&\\?]' + encodeURIComponent(key).replace(/[.+*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$',
        'i',
      ),
      '$1',
    ),
  );
}

export function updateQueryStringParameter(key, value) {
  let updatedUri;
  const uri = window.location.href;
  const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
  const separator = uri.indexOf('?') !== -1 ? '&' : '?';
  if (uri.match(re)) {
    updatedUri = uri.replace(re, '$1' + key + '=' + value + '$2');
  } else {
    updatedUri = uri + separator + key + '=' + value;
  }
  return window.history.replaceState({ path: updatedUri }, '', updatedUri);
}

export function squashArr(arr) {
  return [...new Set(arr)];
}

export const convertJsonToExcel = async (currentRadarObj, excelName) => {
  if (!currentRadarObj.length) return alert('Current radars have no added data');

  const thoughtworksFormat = currentRadarObj.map((item) => {
    return {
      name: item.name,
      description: item.description,
      ring: item.ring,
      radar: item.radar,
      quadrant: item.quadrant,
      isNew: item.moved <= 0 ? 'TRUE' : 'FALSE',
    };
  });

  try {
    const res = await API.post('techradarREST', '/jsonToExcel', {
      body: {
        currentRadarObj: thoughtworksFormat,
      },
      responseType: 'blob',
    });
    console.log(res);
    const url = window.URL.createObjectURL(new Blob([res]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${excelName}.csv`);
    document.body.appendChild(link);
    link.click();
  } catch (err) {
    console.error(err);
  }
};

export function getObjectIndexById(list, id) {
  let index = -1;
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      index = i;
    }
  }

  return index;
}

export function addItemToList(currentList, item) {
  currentList.push(item);
  return currentList;
}

export function deleteItemFromList(currentList, item) {
  return currentList.filter((currentItem) => {
    return currentItem.id !== item.id;
  });
}

export function updateTechFromList(currentTechList, tech) {
  return currentTechList.map((currentTech) => {
    if (tech.id === currentTech.id) {
      return {
        ...currentTech,
        ...tech,
      };
    } else {
      return currentTech;
    }
  });
}

export function getQuadrantAndRingCategory(techList, quadrant, ring) {
  if (!Array.isArray(techList)) return [];
  return techList.filter((tech) => {
    return tech.quadrant === quadrant && tech.ring === ring;
  });
}

export const getRadarNameString = (currentRadarList) => {
  if (currentRadarList.length) {
    const radarIdArr = currentRadarList.map((radar) => {
      return radar.id;
    });
    return radarIdArr.join(' ⭐ ');
  } else {
    return 'No radar selected';
  }
};

export function renderFiveTech(list) {
  if (list.length) {
    let slicedList = list.slice(0, 5);
    const nameList = slicedList.map((item) => {
      return item.name;
    });
    return nameList.join(' ⭐ ');
  } else {
    return 'No technology present';
  }
}

export const removeArrayFromArray = (arr, arrToRemove) => {
  return arr.filter(function(el) {
    return arrToRemove.indexOf(el) < 0;
  });
};

export function dynamicSortMultiple() {
  /*
   * save the arguments object as it will be overwritten
   * note that arguments object is an array-like object
   * consisting of the names of the properties to sort by
   *
   * Usage: dynamicSortMultiple("key1", "key2")
   */
  var props = arguments;
  return function(obj1, obj2) {
    var i = 0,
      result = 0,
      numberOfProperties = props.length;
    /* try getting a different result from 0 (equal)
     * as long as we have extra properties to compare
     */
    while (result === 0 && i < numberOfProperties) {
      result = dynamicSort(props[i])(obj1, obj2);
      i++;
    }
    return result;
  };
}
export function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function(a, b) {
    var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}
