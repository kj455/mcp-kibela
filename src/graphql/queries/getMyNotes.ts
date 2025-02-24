import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { gql } from 'graphql-tag'
import { gqlRequest } from '../request'

type GetMyNotesResponse = {
  currentUser: {
    latestNotes: {
      totalCount: number
      edges: {
        node: {
          id: string
          title: string
          url: string
        }
      }[]
    }
  }
}

type GetMyNotesVariables = {
  limit: number
}

const getMyNotesQuery: TypedDocumentNode<GetMyNotesResponse, GetMyNotesVariables> = gql`
  query GetMyNotes($limit: Int!) {
    currentUser {
      latestNotes(first: $limit) {
        totalCount
        edges {
          node {
            id
            title
            url
          }
        }
      }
    }
  }
`

export async function getMyNotes(variables: GetMyNotesVariables): Promise<GetMyNotesResponse> {
  return gqlRequest(getMyNotesQuery, variables)
}
