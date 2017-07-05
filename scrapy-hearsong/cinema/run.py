from scrapy import cmdline

name='movie -o douban.csv'
cmd = 'scrapy crawl {0}'.format(name)
cmdline.execute(cmd.split())