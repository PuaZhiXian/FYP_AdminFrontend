export interface ILoginResponse {
  token?: string,
  error?: string,
  user: User
}

interface User {
  blocked: boolean,
  createdAt: Date,
  email: string,
  firstname: string,
  id: number,
  isActive: boolean,
  lastname: string,
  preferedLanguage: string,
  updatedAt: Date,
  username: string
}
