import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { gql } from 'graphql-tag'
import { gqlRequest } from '../request'

type GetNoteFromPathResponse = {
  noteFromPath: {
    id: string
    title: string
    content: string
  }
}

type GetNoteFromPathVariables = {
  path: string
}

const getNoteFromPathQuery: TypedDocumentNode<GetNoteFromPathResponse, GetNoteFromPathVariables> = gql`
  query GetNoteFromPath($path: String!) {
    noteFromPath(path: $path) {
      id
      title
      content
    }
  }
`

export async function getNoteFromPath(variables: GetNoteFromPathVariables): Promise<GetNoteFromPathResponse> {
  return gqlRequest(getNoteFromPathQuery, variables)
}
