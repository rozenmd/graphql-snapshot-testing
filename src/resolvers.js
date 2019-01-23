export const getCountries = (parent, args, ctx) => {
  return [
    { id: 1, name: 'United States of America', population: 325700000 },
    { id: 61, name: 'Australia', population: 24600000 },
  ]
}

export default {
  Query: {
    // not much needed here as GraphQL can infer what a viewer should return
    viewer: (parent, args, ctx) => {
      return { name: 'some person' }
    },
  },
  Viewer: {
    countries: getCountries,
  },
  // Mutation: {

  // },
}
