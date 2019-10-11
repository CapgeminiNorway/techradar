/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTech = `subscription OnCreateTech($owner: String) {
  onCreateTech(owner: $owner) {
    id
    name
    description
    quadrant
    ring
    url
    radar {
      id
      description
      prevRadarUrl
      isPublic
      owner
      techList {
        nextToken
      }
    }
    radarId
    confirmed
    owner
    moved
  }
}
`;
export const onUpdateTech = `subscription OnUpdateTech($owner: String) {
  onUpdateTech(owner: $owner) {
    id
    name
    description
    quadrant
    ring
    url
    radar {
      id
      description
      prevRadarUrl
      isPublic
      owner
      techList {
        nextToken
      }
    }
    radarId
    confirmed
    owner
    moved
  }
}
`;
export const onDeleteTech = `subscription OnDeleteTech($owner: String) {
  onDeleteTech(owner: $owner) {
    id
    name
    description
    quadrant
    ring
    url
    radar {
      id
      description
      prevRadarUrl
      isPublic
      owner
      techList {
        nextToken
      }
    }
    radarId
    confirmed
    owner
    moved
  }
}
`;
export const onCreateRadar = `subscription OnCreateRadar($owner: String) {
  onCreateRadar(owner: $owner) {
    id
    description
    prevRadarUrl
    isPublic
    owner
    techList {
      items {
        id
        name
        description
        quadrant
        ring
        url
        radarId
        confirmed
        owner
        moved
      }
      nextToken
    }
  }
}
`;
export const onUpdateRadar = `subscription OnUpdateRadar($owner: String) {
  onUpdateRadar(owner: $owner) {
    id
    description
    prevRadarUrl
    isPublic
    owner
    techList {
      items {
        id
        name
        description
        quadrant
        ring
        url
        radarId
        confirmed
        owner
        moved
      }
      nextToken
    }
  }
}
`;
export const onDeleteRadar = `subscription OnDeleteRadar($owner: String) {
  onDeleteRadar(owner: $owner) {
    id
    description
    prevRadarUrl
    isPublic
    owner
    techList {
      items {
        id
        name
        description
        quadrant
        ring
        url
        radarId
        confirmed
        owner
        moved
      }
      nextToken
    }
  }
}
`;
