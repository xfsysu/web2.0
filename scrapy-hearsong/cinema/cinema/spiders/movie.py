# -*- coding: utf-8 -*-
import scrapy
from cinema.items import CinemaItem

class MovieSpider(scrapy.Spider):
    name = 'movie'
    allowed_domains = ['movie.douban.com']
    start_urls = ['http://movie.douban.com/top250']

    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        for res in response.xpath('//div[@class="item"]'):
        	ciname = CinemaItem()
        	ciname["title"] = res.xpath('.//div[@class="hd"]/a/span/text()').extract_first()
        	ciname["score"] = res.xpath('.//span[@class="rating_num"]/text()').extract_first()
        	ciname["quote"] = res.xpath('.//span[@class="inq"]/text()').extract_first()
        	ciname["image_urls"] = res.xpath('.//div[@class="pic"]//img/@src').extract_first()
        	yield ciname
        # next page
        next_url=response.css('div.paginator span.next a::attr(href)').extract()
        if next_url:
            next_url="https://movie.douban.com/top250"+next_url[0]
            print(next_url)
            yield scrapy.Request(next_url)





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
            yield scrapy.Request(next_url)