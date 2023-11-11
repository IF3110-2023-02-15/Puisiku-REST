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

export class ConfirmationPasswordNotMatched extends Error {
  constructor() {
    super('Password and confirmation password not matched')
    this.name = 'ConfirmationPasswordNotMatched'
  }
}

export class CreatorNotFoundError extends Error {
  constructor() {
    super('Creator not found')
    this.name = 'CreatorNotFound'
  }
}

export class AlbumNotFoundError extends Error {
  constructor() {
    super('Album not Found')
    this.name = 'AlbumNotFound'
  }
}
