import os
import cv2 

##Code to change bulk images to black and white

ip="images"
op="bw_images"
os.makedirs(op,exist_ok=True)
#os.mkdir(op) #will throw error if folder already exists

for i in os.listdir(ip):
    img=cv2.imread(os.path.join(ip,i))
    gry=cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    cv2.imwrite(os.path.join(op,i),gry)