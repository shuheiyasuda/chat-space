class Api::MessagesController < ApplicationController
  def index
    # binding.pry
    group = Group.find(params[:group_id])
    # last_message_id = params[:last_id].to_i
    @messages = group.messages.includes(:user).where("id >?", params[:id])
  end
end
