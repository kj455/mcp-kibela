import { DocumentNode } from 'graphql'
import searchNotesQuery from './queries/searchNotes.gql'
import getMyNotesQuery from './queries/getMyNotes.gql'
import getNoteQuery from './queries/getNote.gql'
import getNoteFromPathQuery from './queries/getNoteFromPath.gql'
import { env } from '../env'
import type { SearchNotesQuery, GetMyNotesQuery, GetNoteQuery, GetNoteFromPathQuery } from './generated/graphql'

export const Queries = {
  searchNotes: searchNotesQuery as DocumentNode,
  getMyNotes: getMyNotesQuery as DocumentNode,
  getNote: getNoteQuery as DocumentNode,
  getNoteFromPath: getNoteFromPathQuery as DocumentNode,
}

function getQueryString(doc: DocumentNode): string {
  return doc.loc?.source.body ?? ''
}

export async function gqlRequest<T>(query: DocumentNode, variables: Record<string, any>): Promise<T> {
  const queryString = getQueryString(query)
  if (!queryString) {
    throw new Error('Failed to get query string')
  }

  console.error('Query:', queryString)
  console.error('Variables:', variables)

  const response = await fetch(`https://${env.KIBELA_TEAM}.kibe.la/api/v1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.KIBELA_TOKEN}`,
    },
    body: JSON.stringify({
      query: queryString,
      variables,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Response:', errorText)
    throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
  }

  const json = await response.json()
  const typedJson = json as { errors?: Array<{ message: string }>; data: T }
  if (typedJson.errors) {
    throw new Error(typedJson.errors[0].message)
  }

  return typedJson.data
}

export type { SearchNotesQuery, GetMyNotesQuery, GetNoteQuery, GetNoteFromPathQuery }
