class Result {
  static Ok(result) {
    return {
      code: 200,
      success: true,
      result
    }
  }

  static Error(result, message) {
    return {
      code: 0,
      success: false,
      result,
      message
    }
  }
}

module.exports = Result;