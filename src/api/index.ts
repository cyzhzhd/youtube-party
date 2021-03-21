export async function fetchTokens(options: {
  id: string;
  password: string;
}): Promise<{ accessToken: string; refreshToken: string }> {
  const response = await fetch(`${process.env.REACT_APP_API_HOST}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  });

  return response.json();
}
export async function fetchJWT(options: { token: string }): Promise<{ accessToken: string }> {
  const response = await fetch(`${process.env.REACT_APP_API_HOST}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  });

  return response.json();
}
export function deleteTokenOnDB(options: { token: string }): void {
  fetch(`${process.env.REACT_APP_API_HOST}/auth/logout`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  });
}
