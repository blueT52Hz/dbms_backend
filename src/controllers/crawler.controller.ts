import { Request, Response } from 'express'
import { CrawlerService } from '~/services/crawler.service'

export class CrawlerController {
  private crawlerService: CrawlerService

  constructor() {
    this.crawlerService = new CrawlerService()
  }

  /**
   * Crawl dữ liệu từ danh sách URLs
   */
  public crawlUrls = async (req: Request, res: Response): Promise<void> => {
    try {
      const { urls, selectors, concurrency } = req.body

      // Validate input
      if (!Array.isArray(urls) || urls.length === 0) {
        res.status(400).json({ error: 'URLs phải là một mảng không rỗng' })
        return
      }

      if (!selectors || typeof selectors !== 'object') {
        res.status(400).json({ error: 'Selectors phải là một object' })
        return
      }

      // Khởi tạo browser
      await this.crawlerService.initialize()

      // Thực hiện crawl
      const results = await this.crawlerService.crawlMultipleUrls(urls, selectors, concurrency)

      res.json({
        success: true,
        data: results
      })
    } catch (error) {
      console.error('Lỗi khi crawl:', error)
      res.status(500).json({
        success: false,
        error: 'Có lỗi xảy ra khi crawl dữ liệu'
      })
    } finally {
      // Đảm bảo đóng browser sau khi hoàn thành
      await this.crawlerService.close()
    }
  }
}

const crawlerController = new CrawlerController()
export default crawlerController
