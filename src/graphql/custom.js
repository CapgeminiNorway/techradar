export const getRadarAllTech = `query ListRadars(
  $radarId: ID,
) {
  listRadars(filter: { id: { eq: $radarId } }) {
    items {
      id
      description
      prevRadarUrl
      owner
      techList(limit: 150) {
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
    nextToken
  }
}
`;
