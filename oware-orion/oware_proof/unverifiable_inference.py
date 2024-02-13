from giza_actions.action import Action, action
from giza_actions.task import task
from giza_actions.model import GizaModel
import numpy as np

@task(name='Prediction with ONNX')
def prediction(legal_state):
    model = GizaModel(model_path="/home/kagwe/dojoprojetcs/Oware/oware-orion/oware_logic_and_model/model/oware-100.onnx")
    result = model.predict(
        input_feed={'dense_297_input':legal_state}, verifiable=False
    )
    return result

@action(name='Execution: Prediction with ONNX', log_prints=True)
def execution():
    # Given array
    input_array = np.array([5, 5, 5, 6, 6, 0, 4, 4, 4, 4, 0, 5])

    # Reshape the array into a 2D array with shape (1, 12)
    reshaped_array = input_array.reshape(1, 12)

    # Convert the array to floats
    float_array = reshaped_array.astype(np.float32)  # You can also use np.float64 if needed


    legal_state = float_array
    predicted_digit = prediction(legal_state)
    print(f"Predicted Digit: {predicted_digit}")
    return predicted_digit

execution()