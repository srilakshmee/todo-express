export const  clientErrorHandler  = (err, req, res, next) => {
    if (req.xhr) {
      res.status(500).send({ error: err?.message || "Something failed"})
    } else {
      next(err)
    }
  }