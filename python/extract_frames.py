#! python3

import cv2, os

class Extract_frames ():
    """
    Extract frames for videos an select only 6 frames for generate the animations
    """ 

    def __init__ (self, path_videos, num_frames, auto_replace = False): 
        """
        Constructor of the class. Set videos folder
        """

        self.path_videos = path_videos
        self.auto_replace = auto_replace
        self.num_frames = num_frames

        self.__extract_specific_frames()

    def __extract_specific_frames (self): 
        """
        Extract all frames from each video, and save in specific folder
        """

        print ("Extracting frames from videos...")

        os.chdir (self.path_videos)

        for video in os.listdir (self.path_videos):

            # Make folder to save frames
            folder_name = os.path.basename (video)[:video.find (".")]
            os.makedirs (folder_name, exist_ok=True)

            # Read frames fom video
            cap= cv2.cv2.VideoCapture(video)
            i=0
            while(cap.isOpened()):
                ret, frame = cap.read()
                if ret == False:
                    break

                # Save each selected frame
                if i%self.num_frames == 0: 
                    file_name = os.path.join (folder_name, folder_name+ " - "+ str(i)+'.jpg')
                    if os.path.isfile (file_name) and self.auto_replace == False: 
                        continue
                    else: 
                        cv2.cv2.imwrite(file_name,frame)
                        print ("Frame {} generated".format (file_name))
                i+=1

            cap.release()
            cv2.cv2.destroyAllWindows()

