class StaticController < ApplicationController

  #caches_page StaticPages::Pages

  ::StaticPages::Pages.each do |page_name|
    define_method(page_name) {
      #@page_title = "Array Biostatistics - #{page_name.to_s.titleize}"
    }
  end


end
