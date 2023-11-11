import UserRepository from '../repositories/user.repository'

class UserService {
  constructor(private userRepository: UserRepository) {}

  async getProfileById(id: number) {
    return await this.userRepository.getUserById(id)
  }

  async updateProfile(
    id: number,
    data: { name?: string; description?: string; imagePath?: string }
  ) {
    return await this.userRepository.updateUserProfile(id, data)
  }
}

export default UserService
