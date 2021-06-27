import { NextFunction, Request, RequestHandler, Response } from "express";
import { verify } from 'jsonwebtoken'

export function ensureAuthenticated(
  request: Request, 
  response: Response, 
  next: NextFunction
) {

  // Receber o token
  const tokenFromHeader = request.headers.authorization

  if (!tokenFromHeader) {
    // .end() retorna a mensagem padrão definida pelo status 401
    return response.status(401).end()
  }

  const [, token] = tokenFromHeader.split(' ')

  try {
    const { sub } = verify(token, process.env.TOKEN_SECRET)
    request.user_id = sub as string

    return next()

  } catch (error) {

    return response.status(401).end()
  }

}
