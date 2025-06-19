import { Router } from 'express'
import crawlerController from '~/controllers/crawler.controller'

const crawlerRouter = Router()

// Route để crawl dữ liệu từ danh sách URLs
crawlerRouter.post('/crawl', crawlerController.crawlUrls)

export default crawlerRouter
