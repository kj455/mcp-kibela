import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { gql } from 'graphql-tag'
import { gqlRequest } from '../request'

type UpdateNoteContentResponse = {
  updateNoteContent: {
    clientMutationId: string
    note: {
      id: string
    }
  }
}

type UpdateNoteContentVariables = {
  input: {
    clientMutationId: string
    id: string
    newContent: string
    baseContent: string
  }
}

const updateNoteContentMutation: TypedDocumentNode<UpdateNoteContentResponse, UpdateNoteContentVariables> = gql`
  mutation UpdateNoteContent($input: UpdateNoteContentInput!) {
    updateNoteContent(input: $input) {
      clientMutationId
      note {
        id
      }
    }
  }
`

export async function updateNoteContent(variables: UpdateNoteContentVariables): Promise<UpdateNoteContentResponse> {
  return gqlRequest(updateNoteContentMutation, variables)
}
