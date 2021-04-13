from __future__ import division, print_function
# coding=utf-8
import sys
import os
import glob
import re
import numpy as np

# Keras
from tensorflow.keras.applications.imagenet_utils import preprocess_input, decode_predictions
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# Flask utils
from flask import Flask, redirect, url_for, request, render_template, jsonify
from werkzeug.utils import secure_filename
#from gevent.pywsgi import WSGIServer

# Define a flask app
app = Flask(__name__)

# Model saved with Keras model.save()
MODEL_PATH ='model_resnet50.h5'

# Load your trained model
cnnModel = load_model(MODEL_PATH)




def model_predict(img_path, cnnModel):
    # this is our code from colab 
    img=image.load_img(img_path,target_size=(224,224))

    x=image.img_to_array(img)
    x=x/255
    x=np.expand_dims(x,axis=0)
    img_data=x
    print(cnnModel.predict(x))
    
    op = str((cnnModel.predict(x) > 0.5).astype("int32")[0][0])
    return op

@app.route('/', methods=['GET'])
def index():
    # Main page
    return render_template('index.html')


@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # Get the file from post request
        f = request.files['file']

        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        # Make prediction
        preds = model_predict(file_path, cnnModel)
        result=preds
        return result
    return None

@app.route('/uppp',methods=['POST'])
def upp():
    
    image = request.files['IMG']
    
    basepath = os.path.dirname(__file__)
    file_path = os.path.join(
        basepath, 'uploads', secure_filename(image.filename
        ))
    image.save(file_path)
    preds = model_predict(file_path, cnnModel)
    
    if preds == '1':
        result = "Negative"
    elif preds == '0':
        result = "Positive"

    return jsonify(
        result= result
    )
    


if __name__ == '__main__':
    app.run(debug=True)
