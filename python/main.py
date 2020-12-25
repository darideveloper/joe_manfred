#! python3

import os
from resize import Resize
from rwJson import writeJsonFile
from generate_web import Generate

# Paths
parent_path = os.path.dirname (os.path.dirname (__file__))
path = os.path.join (parent_path, "web")

# Resize images
origin_resize = os.path.join (path, "imgs", "all")
destination_resize = os.path.join (path, "imgs", "small")

myResize = Resize(origin_resize, destination_resize, auto_replace=False)

# Generate Html Files
my_generate = Generate (path)
my_generate.index()