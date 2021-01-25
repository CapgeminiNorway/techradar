/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTech = /* GraphQL */ `
  query GetTech($id: ID!) {
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
        createdAt
        updatedAt
      }
      radarId
      confirmed
      owner
      moved
      createdAt
      updatedAt
    }
  }
`;
export const listTechs = /* GraphQL */ `
  query ListTechs($filter: ModelTechFilterInput, $limit: Int, $nextToken: String) {
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
          createdAt
          updatedAt
        }
        radarId
        confirmed
        owner
        moved
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRadar = /* GraphQL */ `
  query GetRadar($id: ID!) {
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
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listRadars = /* GraphQL */ `
  query ListRadars($filter: ModelRadarFilterInput, $limit: Int, $nextToken: String) {
    listRadars(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        isPublic
        owner
        techList {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
