export async function logout() {
  const response = await fetch('/api/logout', {
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Não foi possível sair do sistema.')
  }

  return response.json() as Promise<{ success: true }>
}
