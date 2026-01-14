export interface LoginResponse {
    data?: {
      token(arg0: string, token: any): unknown
      user: {
        address: string
        phone: string
        id: number
        username: string
        email: string
        roles: string[]
        permissions: string[]
        token: string
      }
    },
    message?: string
    exception?: string
    status: string
    statusCode: number
    timestamp: string
  }