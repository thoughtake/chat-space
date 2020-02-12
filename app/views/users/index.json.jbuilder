json.array! @users.each do |user|
  json.id         user.id
  json.user_name  user.name
end