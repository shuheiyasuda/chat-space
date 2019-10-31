class MassagesController < ApplicationController

  def index
    @messages = Message.includes(user)
  end

  def create
    Message.create(post_message)
    redirect_to messages_path
  end

  private
    def post_massage
      params.require(:messages).permit(:text, image)
    end

end
