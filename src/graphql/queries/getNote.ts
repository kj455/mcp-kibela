import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { gql } from 'graphql-tag'
import { gqlRequest } from '../request'

type GetNoteResponse = {
  note: {
    id: string
    title: string
    content: string
  }
}

type GetNoteVariables = {
  id: string
}

const getNoteQuery: TypedDocumentNode<GetNoteResponse, GetNoteVariables> = gql`
  query GetNote($id: ID!) {
    note(id: $id) {
      id
      title
      content
    }
  }
`

export async function getNote(variables: GetNoteVariables): Promise<GetNoteResponse> {
  return gqlRequest(getNoteQuery, variables)
}
