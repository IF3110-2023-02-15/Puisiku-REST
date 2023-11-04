import { Request, Response } from 'express'

import UserService from '../services/user.service'
import SubscriptionService from '../services/subscription.service'
import UserRepository from '../repositories/user.repository'

class UserController {
  private userService: UserService
  private subscriptionService: SubscriptionService

  constructor() {
    ;(this.userService = new UserService(new UserRepository())),
      (this.subscriptionService = new SubscriptionService())
  }

  getProfile = async (req: Request, res: Response) => {
    const id = Number(req.user && req.user.id)

    if (isNaN(id)) {
      return res.status(400).json({ message: 'User id not valid' })
    }

    try {
      const user = await this.userService.getProfileById(id)

      if (!user) {
        return res.status(404).json({ message: 'User Not Found' })
      }

      const subscription = await this.subscriptionService.getSubscriber(
        user.email
      )

      res.json({ user, subscription })
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving profile' })
    }
  }

  updateProfile = async (req: Request, res: Response) => {
    const id = Number(req.user && req.user.id)
    const { name } = req.body

    try {
      const updatedUser = await this.userService.updateProfile(id, name)
      res.json(updatedUser)
    } catch (error) {
      res.status(500).json({ message: 'Error updating profile' })
    }
  }
}

export default UserController
