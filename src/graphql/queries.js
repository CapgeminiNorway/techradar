/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTech = `query GetTech($id: ID!) {
  getTech(id: $id) {
    id
    name
    description
    quadrant
    ring
    url
    radar {
      id
      description
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
export const listTechs = `query ListTechs(
  $filter: ModelTechFilterInput
  $limit: Int
  $nextToken: String
) {
  listTechs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      quadrant
      ring
      url
      radar {
        id
        description
        isPublic
        owner
      }
      radarId
      confirmed
      owner
      moved
    }
    nextToken
  }
}
`;
export const getRadar = `query GetRadar($id: ID!) {
  getRadar(id: $id) {
    id
    description
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
export const listRadars = `query ListRadars(
  $filter: ModelRadarFilterInput
  $limit: Int
  $nextToken: String
) {
  listRadars(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      description
      isPublic
      owner
      techList {
        nextToken
      }
    }
    nextToken
  }
}
`;
