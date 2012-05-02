class StaticController < ApplicationController

  Pages = [ :home, :who, :customer, :leadership, :services, :contact ]

  caches_page Pages

  Pages.each do |page_name|
    define_method(page_name) {
      #@page_title = "Array Biostatistics - #{page_name.to_s.titleize}"
    }
  end


end
