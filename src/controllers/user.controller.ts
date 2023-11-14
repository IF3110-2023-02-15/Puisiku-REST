import { Request, Response } from 'express'

import UserService from '../services/user.service'
import SubscriptionService from '../services/subscription.service'
import UserRepository from '../repositories/user.repository'
import { GetSubscriberError } from '../errors/errors'

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

      const subscriber = await this.subscriptionService.getSubscriber(id)

      return res.json({ ...user, ...subscriber })
    } catch (error: any) {
      if (error instanceof GetSubscriberError) {
        return res.status(400).json({ error: error.message })
      }
      return res
        .status(500)
        .json({ message: 'Error retrieving profile' + error.toString() })
    }
  }

  getCreatorById = async (req: Request, res: Response) => {
    const id = Number(req.params.creatorId)

    if (isNaN(id)) {
      return res.status(400).json({ message: 'User id not valid' })
    }

    try {
      const user = await this.userService.getProfileById(id)

      if (!user) {
        return res.status(404).json({ message: 'User Not Found' })
      }

      return res.json(user)
    } catch (error: any) {
      if (error instanceof GetSubscriberError) {
        return res.status(400).json({ error: error.message })
      }
      return res
        .status(500)
        .json({ message: 'Error retrieving profile' + error.toString() })
    }
  }

  updateProfile = async (req: Request, res: Response) => {
    const id = Number(req.user && req.user.id)
    const { name, description, imagePath } = req.body

    try {
      const updatedUser = await this.userService.updateProfile(id, {
        name,
        description,
        imagePath,
      })
      res.json(updatedUser)
    } catch (error) {
      res.status(500).json({ message: 'Error updating profile' })
    }
  }

  getCreators = async (req: Request, res: Response) => {
    try {
      const creators = await this.userService.getCreators()

      res.json(creators)
    } catch (error) {
      res.status(500).json({ message: 'Error getting creators' })
    }
  }
}

export default UserController
