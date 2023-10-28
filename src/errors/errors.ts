export class EmailExistsError extends Error {
  constructor() {
    super('Email already exists')
    this.name = 'EmailExistsError'
  }
}

export class EnvVarsError extends Error {
  constructor() {
    super(
      'JWT_SECRET_KEY or JWT_EXPIRE_TIME is not set in the environment variables'
    )
    this.name = 'EnvVarsError'
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super('User not found')
    this.name = 'UserNotFoundError'
  }
}

export class IncorrectPasswordError extends Error {
  constructor() {
    super('Incorrect password')
    this.name = 'IncorrectPasswordError'
  }
}
