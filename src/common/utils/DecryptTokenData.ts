import jwtDecode from 'jwt-decode';

interface GetJwtPayloadResponse {
  email: string;
  exp: number;
  iat: number;
  id: string;
  name: string;
  role: string;
  sub: string;
}

export function getJwtPayload(token: string): GetJwtPayloadResponse {
  return jwtDecode(token);
}
