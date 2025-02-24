import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { env } from '../env'

export async function gqlRequest<TData, TVariables>(
  query: TypedDocumentNode<TData, TVariables>,
  variables: TVariables,
): Promise<TData> {
  const queryString = query.loc?.source.body ?? ''
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
  const typedJson = json as { errors?: Array<{ message: string }>; data: TData }
  if (typedJson.errors) {
    throw new Error(typedJson.errors[0].message)
  }

  return typedJson.data
}
