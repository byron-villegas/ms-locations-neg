class ParametersError extends Error {
  constructor(campo = '', mensaje = '') {
    super('Parametros invalidos');
    this.detalles = [{ campo, mensaje }];
  }

  static fromDetalles(detalles = []) {
    const error = new ParametersError();
    error.detalles = detalles;
    return error;
  }

  static fromValidationErrors(validationErrors = []) {
    const detalles = validationErrors.map(err => ({
      campo: err.path,
      mensaje: err.msg
    }));
    return ParametersError.fromDetalles(detalles);
  }
}

module.exports = ParametersError;