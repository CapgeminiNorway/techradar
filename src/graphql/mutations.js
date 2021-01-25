/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTech = /* GraphQL */ `
  mutation CreateTech($input: CreateTechInput!) {
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
export const updateTech = /* GraphQL */ `
  mutation UpdateTech($input: UpdateTechInput!) {
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
export const deleteTech = /* GraphQL */ `
  mutation DeleteTech($input: DeleteTechInput!) {
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
export const createRadar = /* GraphQL */ `
  mutation CreateRadar($input: CreateRadarInput!) {
    createRadar(input: $input) {
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
export const updateRadar = /* GraphQL */ `
  mutation UpdateRadar($input: UpdateRadarInput!) {
    updateRadar(input: $input) {
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
export const deleteRadar = /* GraphQL */ `
  mutation DeleteRadar($input: DeleteRadarInput!) {
    deleteRadar(input: $input) {
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
