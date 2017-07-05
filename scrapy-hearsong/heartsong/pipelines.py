# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
import os
import urllib
import pymongo
from scrapy.conf import settings

class HeartsongPipeline(object):
	def __init__(self):
		host = settings['MONGODB_HOST']
		port = settings['MONGODB_PORT']
		dbName = settings['MONGODB_DBNAME']
		client = pymongo.MongoClient(host=host,port=port)
		tdb = client[dbName]
		self.post = tdb[settings['MONGODB_DOCNAME']]

	def process_item(self, item, spider):
		#store the info into mong
		info = dict(item)
		self.post.insert(info)

		dir_path = './%s' %(spider.name) #store path
		print 'dir_path',dir_path
		if not os.path.exists(dir_path):
			os.makedirs(dir_path)
		image_url = item['image_urls']
		list_name = image_url.split('/')
		image_name = list_name[len(list_name)-1]
		image_dir = '%s/%s' %(dir_path,image_name)
		with open(image_dir,'wb') as file:
			conn = urllib.urlopen(image_url)
			file.write(conn.read())
		file.close()

		'''
		print 'image_dir',image_dir
		for image_url in item['image_urls']:
			list_name = image_url.split('/')
			image_name = list_name[len(list_name)-1]
			image_dir = '%s/%s' %(dir_path,image_name)
			print 'image_dir',image_dir
			if os.path.exists(image_dir):
				continue

			with open(image_dir, 'wb') as file:
				conn = urllib.urlopen(image_url)
				file.write(conn.read())
			file.close()
		'''
		return item
