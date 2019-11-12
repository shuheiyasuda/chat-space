json.text   @message.text
json.image  @message.image.url
json.name   @message.user.name
json.created_at    @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id     @message.id

