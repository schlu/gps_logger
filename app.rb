require 'rubygems'
require 'sinatra'

get '/' do
  open(File.join(File.dirname(__FILE__), "log", "waypoints"), "a") do |f|
    f.write "#{params['latitude']},#{params['longitude']},#{params['speed']},#{params['accuracy']},#{Time.now},#{params['course']}\n"
  end
  "success"
end

get '/map.html' do
  erb :map
end