import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { gql } from 'graphql-tag'
import { gqlRequest } from '../request'

type SearchNotesResponse = {
  search: {
    edges: {
      node: {
        document: {
          id: string
          title: string
          url: string
        }
      }[]
    }
  }
}

type SearchNotesVariables = {
  query: string
}

const searchNotesQuery: TypedDocumentNode<SearchNotesResponse, SearchNotesVariables> = gql`
  query SearchNotes($query: String!) {
    search(query: $query, first: 15) {
      edges {
        node {
          document {
            ... on Note {
              id
              title
              url
            }
          }
        }
      }
    }
  }
`

export async function searchNotes(variables: SearchNotesVariables): Promise<SearchNotesResponse> {
  return gqlRequest(searchNotesQuery, variables)
}
