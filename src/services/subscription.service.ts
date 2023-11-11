const soap: any = require('strong-soap').soap
import { GetSubscriberError } from '../errors/errors'

const SOAP_BASE_URL = process.env.SOAP_BASE_URL
const SOAP_API_KEY = process.env.SOAP_API_KEY

interface SubscriberResponse {
  message: string
  status: number
}

class SubscriptionService {
  constructor() {}

  async getSubscriber(creatorId: number): Promise<{ subscriber: number }> {
    const url = SOAP_BASE_URL + '/subscription?wsdl'
    const headers = {
      'x-api-key': SOAP_API_KEY,
    }
    const args = { creatorId: creatorId }

    const client: any = await new Promise((resolve, reject) => {
      soap.createClient(
        url,
        { wsdl_headers: headers },
        (err: any, client: any) => {
          if (err) reject(err)
          resolve(client)
        }
      )
    })

    const result: { return: SubscriberResponse } = await new Promise(
      (resolve, reject) => {
        client.getSubscriberCount(
          args,
          (err: any, result: { return: SubscriberResponse }) => {
            if (err) reject(err)
            resolve(result)
          }
        )
      }
    )

    const { message, status } = result.return
    if (status === 200) {
      return { subscriber: Number(message) }
    } else {
      throw new GetSubscriberError()
    }
  }
}

export default SubscriptionService
