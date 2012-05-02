#!/usr/bin/env ruby
ArrayDir = ENV['ARRAY']
require "#{ArrayDir}/support/static_pages"
require 'fileutils'
require 'open-uri'

UrlPrefix = "http://127.0.0.1:#{ARGV[0] || '8080'}"
PublicDir = "#{ArrayDir}/public"

StaticPages::Pages.each do |page_name|
  #expire_page( :controller => 'static', :action => page_name )
  html = open("#{UrlPrefix}/#{page_name}").read
  #html = exec("curl #{UrlPrefix}/#{page_name}")
  dir = "#{PublicDir}/#{page_name}"
  FileUtils.mkdir_p(dir)
  File.open("#{dir}/index.html", 'w') {|f| f.write(html); f.close }
  puts "Page #{page_name} length: #{html.length}"
end
