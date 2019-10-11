/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTech = `mutation CreateTech($input: CreateTechInput!) {
  createTech(input: $input) {
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
export const updateTech = `mutation UpdateTech($input: UpdateTechInput!) {
  updateTech(input: $input) {
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
export const deleteTech = `mutation DeleteTech($input: DeleteTechInput!) {
  deleteTech(input: $input) {
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
export const createRadar = `mutation CreateRadar($input: CreateRadarInput!) {
  createRadar(input: $input) {
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
export const updateRadar = `mutation UpdateRadar($input: UpdateRadarInput!) {
  updateRadar(input: $input) {
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
export const deleteRadar = `mutation DeleteRadar($input: DeleteRadarInput!) {
  deleteRadar(input: $input) {
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
