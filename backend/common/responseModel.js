export function successResponse(res, message, data = null) {
  return res.status(200).json({
    success: true,
    message,
    data,
  })
}

export function errorResponse(res, statusCode, message) {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
  })
}