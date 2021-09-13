import axios, { AxiosInstance } from 'axios'
import { FIGMA_TOKEN } from '../utils/constants'
import { log } from './LogService'

interface FigmaFileApiResponse {
  name: string
  document: FigmaNode
}

export default class FigmaApiService {
  api: AxiosInstance

  constructor() {
    if (!FIGMA_TOKEN) {
      log.info('FIGMA_TOKEN missing')
    }

    this.api = axios.create({
      baseURL: 'https://api.figma.com/v1',
      headers: {
        'X-FIGMA-TOKEN': FIGMA_TOKEN,
      },
    })
  }

  async getBoard(boardId: string) {
    return await this.api.get<FigmaFileApiResponse>(`files/${boardId}`)
  }
}
