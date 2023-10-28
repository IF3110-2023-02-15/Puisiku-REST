import UserRepository from '../repositories/user.repository'

class UserService {
  constructor(private userRepository: UserRepository) {}

  async getProfileById(id: number) {
    return await this.userRepository.getUserById(id)
  }

  async updateProfile(id: number, name: string) {
    return await this.userRepository.updateUserName(id, name)
  }
}

export default UserService
