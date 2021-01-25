/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTech = /* GraphQL */ `
  subscription OnCreateTech {
    onCreateTech {
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
export const onUpdateTech = /* GraphQL */ `
  subscription OnUpdateTech {
    onUpdateTech {
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
export const onDeleteTech = /* GraphQL */ `
  subscription OnDeleteTech {
    onDeleteTech {
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
export const onCreateRadar = /* GraphQL */ `
  subscription OnCreateRadar {
    onCreateRadar {
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
export const onUpdateRadar = /* GraphQL */ `
  subscription OnUpdateRadar {
    onUpdateRadar {
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
export const onDeleteRadar = /* GraphQL */ `
  subscription OnDeleteRadar {
    onDeleteRadar {
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
