import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { gql } from 'graphql-tag'
import { gqlRequest } from '../request'

type CreateNoteResponse = {
  createNote: {
    clientMutationId: string
    note: {
      id: string
      title: string
      content: string
      url: string
    }
  }
}

type CreateNoteVariables = {
  input: {
    clientMutationId: string
    title: string
    content: string
    coediting: boolean
    groupIds: string[]
    folders?: string[]
    authorId?: string
    draft?: boolean
  }
}

const createNoteMutation: TypedDocumentNode<CreateNoteResponse, CreateNoteVariables> = gql`
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      clientMutationId
      note {
        id
        title
        content
        url
      }
    }
  }
`

export async function createNote(variables: CreateNoteVariables): Promise<CreateNoteResponse> {
  return gqlRequest(createNoteMutation, variables)
}
