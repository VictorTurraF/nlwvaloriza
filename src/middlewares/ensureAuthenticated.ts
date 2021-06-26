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
    const { sub } = verify(token, "b996e7eaf8a2b199279360a76b18ab92c4191d84b37e1243c90cd1d7bb966567")
    request.user_id = sub as string

    return next()

  } catch (error) {

    return response.status(401).end()
  }

}
