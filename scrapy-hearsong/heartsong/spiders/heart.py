# -*- coding: utf-8 -*-
import scrapy
from heartsong.items import HeartsongItem

'''same with below but the result is not the same
class HeartSpider(scrapy.Spider):
	name = 'heart'
	allowed_domains = ['movie.douban.com']
	start_urls = ['http://movie.douban.com/top250']
    
	def start_requests(self):
		for url in self.start_urls:
			yield scrapy.Request(url=url, callback=self.parse)
	
	def parse(self, response):
		for res in response.xpath('//div[@class="item"]'):
			item = HeartsongItem()
			item['title'] = response.xpath('.//div[@class="hd"]/a/span/text()').extract_first()
			item['score'] = response.xpath('.//span[@class="rating_num"]/text()').extract_first()
			item['quote'] = response.xpath('.//span[@class="inq"]/text()').extract_first()
			item['image_urls'] = response.xpath('.//div[@class="pic"]//img/@src').extract_first()
			yield item #shou

		next_url = response.xpath('//div[@class="paginator"]/span[@class="next"]/a/@href').extract_first()
		print 'next_url',next_url# info 
		if next_url:
			next_url = 'https://movie.douban.com/top250' + next_url
			yield scrapy.Request(next_url)
'''
class HeartSpider(scrapy.Spider):
    name = 'heart'
    allowed_domains = ['movie.douban.com']
    start_urls = ['http://movie.douban.com/top250']
    '''
    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(url=url)
	'''
    def parse(self, response):
        for res in response.xpath('//div[@class="item"]'):
        	item = HeartsongItem()
        	item["title"] = res.xpath('.//div[@class="hd"]/a/span/text()').extract_first()
        	item["score"] = res.xpath('.//span[@class="rating_num"]/text()').extract_first()
        	item["quote"] = res.xpath('.//span[@class="inq"]/text()').extract_first()
        	item["image_urls"] = res.xpath('.//div[@class="pic"]//img/@src').extract_first()
        	yield item
        # next page
        next_url = response.xpath('//div[@class="paginator"]/span[@class="next"]/a/@href').extract_first()
        if next_url:
            next_url="https://movie.douban.com/top250"+next_url
            print(next_url)
            yield scrapy.Request(next_url,callback=self.parse)
