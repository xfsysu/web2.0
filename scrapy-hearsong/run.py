from scrapy import cmdline

name = 'heart'
cmd = 'scrapy crawl {0} -o movie.csv'.format(name)
cmdline.execute(cmd.split())