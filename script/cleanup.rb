#!/usr/bin/env ruby
ArrayDir = ENV['ARRAY']
require "#{ArrayDir}/support/static_pages"
require 'fileutils'

PublicDir = "#{ArrayDir}/public"
raise "ARRAY env variable required" unless ArrayDir.length > 12

StaticPages::Pages.each do |page_name|
  page_name = page_name.to_s
  path = "#{PublicDir}#{page_name == 'home' ? '' : '/' + page_name}/index.html"
  puts "Deleting: #{path}"
  FileUtils.remove(path) if File.exist?(path)
end
assets_dir = "#{PublicDir}/assets"
puts "Deleting: #{assets_dir}"
FileUtils.mv(assets_dir, "#{assets_dir}.prev") if File.exist?(assets_dir)
