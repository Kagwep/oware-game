import onnx

# Load the ONNX model and check the model structure
onnx_model = onnx.load('model/oware-100.onnx')
onnx.checker.check_model(onnx_model)

# You can print the ONNX model's graph to inspect its structure
print(onnx_model.graph)