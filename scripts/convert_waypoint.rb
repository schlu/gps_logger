require 'rubygems'
require 'json'

waypoints = open(File.join(File.dirname(__FILE__), "..", "log", "waypoints"))
data = waypoints.lines.collect do |l|
  parts = l.split(",")
  {
    "latitude" => parts[0].to_f,
    "longitude" => parts[1].to_f,
    "speed" => (parts[2].to_f * 2.23693629),
    "accuracy" => parts[3].to_f,
    "time" => parts[4]
  }
end
data_string = "waypoint_data = " + data.to_json

waypoints = open(File.join(File.dirname(__FILE__), "..", "public", "data.js"), "w") do |f|
  f.write data_string
end