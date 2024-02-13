from tensorflow.python.keras.models import load_model
import os
os.environ['TF_KERAS'] = '1'
import onnxmltools


model = load_model('/home/kagwe/dojoprojetcs/Oware/oware-orion/oware_logic_and_model/model/oware-100.h5',compile=False)
onnx_model = onnxmltools.convert_keras(model) 

onnxmltools.utils.save_model(onnx_model, 'oware-100.onnx')