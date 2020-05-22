/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTech = `subscription OnCreateTech {
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
    }
    radarId
    confirmed
    owner
    moved
  }
}
`;
export const onUpdateTech = `subscription OnUpdateTech {
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
    }
    radarId
    confirmed
    owner
    moved
  }
}
`;
export const onDeleteTech = `subscription OnDeleteTech {
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
    }
    radarId
    confirmed
    owner
    moved
  }
}
`;
export const onCreateRadar = `subscription OnCreateRadar {
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
      }
      nextToken
    }
  }
}
`;
export const onUpdateRadar = `subscription OnUpdateRadar {
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
      }
      nextToken
    }
  }
}
`;
export const onDeleteRadar = `subscription OnDeleteRadar {
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
      }
      nextToken
    }
  }
}
`;
