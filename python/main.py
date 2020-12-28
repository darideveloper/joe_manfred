#! python3

import os
from resize_images import Resize
from rwJson import writeJsonFile
from generate_web import Generate
from video_master import Video_master

# Paths
parent_path = os.path.dirname (os.path.dirname (__file__))
path = os.path.join (parent_path, "web")

# processing videos
videos_path = os.path.join (path, "video")
my_video_master = Video_master (videos_path)
my_video_master.generate_ss (-400, auto_replace = False)
my_video_master.resize_videos(240)
my_video_master.move_ss (auto_replace = False)

# Resize images
origin_resize = os.path.join (path, "imgs", "all")
destination_resize = os.path.join (path, "imgs", "small")
myResize = Resize(origin_resize, destination_resize, auto_replace=False)

# Generate Html Files
my_generate = Generate (path)
my_generate.index()
my_generate.boards()
my_generate.articles()

print ("Done")