#! python3

import os
from PIL import Image

class Resize (): 
    """rize image folder with specific with or height"""
    def __init__ (self, folder_origin, folder_destinarion, ): 
        """Constructor"""

        self.data = []

        images = os.listdir (folder_origin)
        for image in images:


            print ("Resizing image: {}".format(image))

            current_image = Image.open (os.path.join(folder_origin, image))
            width, height = current_image.size
            resized_image = current_image.resize ((int(250*width/height), int(250)))
            resized_image.save(os.path.join(folder_destinarion, image))

    #         image_data = {
    #             "name": image, 
    #             "url": image, 
    #             "best": False, 
    #             "description":"Without description yet", 
    #             "size":"{} x {}".format(width, height),
    #             "date": image[0:8],
    #             "video": False
    #             }
    #         self.data.append (image_data)

    # def __sort_data (self): 
    #     """ Sort data by date""" 
    #     arr = self.data
    #     n = len(arr) 
    #     for i in range(n-1): 
    #         for j in range(0, n-i-1): 
    #             if arr[j]["date"] < arr[j+1]["date"]: 
    #                 arr[j], arr[j+1] = arr[j+1], arr[j] 

    
    # def return_images_data (self): 
    #     """ Return the data of all images"""
    #     self.__sort_data()
    #     return self.data





