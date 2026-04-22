import { errorResponse } from '../common/responseModel.js'

export function validate(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body)
    if (!parsed.success) {
      return errorResponse(res, 400, parsed.error.issues[0].message)
    }
    req.body = parsed.data
    next()
  }
}