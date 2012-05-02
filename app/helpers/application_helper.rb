module ApplicationHelper

  def current_or_link(page, content)
    if controller.action_name == page || (page == '' && controller.action_name == 'home')
      raw "<span class='current'>#{content}</span>"
    else
      raw "<a href='/#{page}'>#{content}</a>"
    end
  end
end
