import graphqlHTTP from 'express-graphql'
import { getCountries } from './resolvers'
import schema from './schema'

test('the snapshot matches', async () => {
  // create a graphlhttp middleware
  const middleware = graphqlHTTP({
    //some schema containing the fields we're about to query
    schema,
    rootValue: {
      id: 'viewer',
      loaders: {
        //mock the data somehow
        countries: getCountries,
      },
    },
  })

  // create a mocked request
  const request = {
    method: 'POST',
    headers: {},
    //replace with your query
    body: { query: '{ viewer { countries { name } } }' },
  }

  // create a mock response, graphql middleware calls json() to set response data, so we need to mock it.
  const response = {
    setHeader: jest.fn(),
    end: jest.fn(),
    json: jest.fn(),
  }

  // call middleware function with mocked response and request
  await middleware(request, response)

  // get json's stub function arguments, this is actually a data returned by graphql middleware
  const responseData = response.json.mock.calls[0][0]
  // use jest.snapshot to snapshot test
  expect(responseData).toMatchSnapshot()
})
