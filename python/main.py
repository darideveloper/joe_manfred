#! python3

import os
from resize import Resize
from rwJson import writeJsonFile

# Resize images

path = os.path.dirname (os.path.dirname (__file__))
origin = os.path.join (path, "web", "imgs", "all",)
destination = os.path.join (path, "web", "imgs", "small",)

myResize = Resize(origin, destination)