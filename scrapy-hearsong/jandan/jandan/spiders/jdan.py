# -*- coding: utf-8 -*-
import scrapy
from jandan.items import JandanItem


class JdanSpider(scrapy.Spider):
    name = 'jiandan'
    allowed_domains = ['tieba.baidu.com']
    start_urls = ['https://tieba.baidu.com/p/4975828370?fr=ala0&pstaala=1&tpl=5&isgod=0']

    def parse(self, response):
        item = JandanItem()
        item['image_urls'] = response.xpath('//img[@class="BDE_Image"]//@src').extract()
        yield item

        next_url = response.xpath('//li[@class="l_pager pager_theme_5 pb_list_pager"]/a[last()]/@href').extract_first()
        print 'next_url',next_url

        if next_url:
        	next_url = 'https://tieba.baidu.com' + next_url
        	yield scrapy.Request(next_url, callback=self.parse)