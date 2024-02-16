from giza_actions.action import Action, action
from giza_actions.task import task
from giza_actions.model import GizaModel
import numpy as np

def decimal_to_fp16x16(num):
    whole_num = int(num)
    fractional_part = int((num - whole_num) * 65536)
    fp_number = (whole_num << 16) + fractional_part
    return fp_number


@task(name='Prediction with Cairo')
def prediction(legal_state, model_id, version_id):
    # Initialize a GizaModel with model and version id.
    model = GizaModel(
        id=model_id,
        version=version_id
    )
    
    # Call the predict function. 
    #Set `verifiable` to True, and define the expecting output datatype.
    (result, request_id) = model.predict( 
        input_feed={'dense_297_input':legal_state}, 
        verifiable=True
    )
    return result, request_id

@action(name='Execution: Prediction with Cairo', log_prints=True)
def execution():
    # Given array
    input_array = np.array([5, 5, 5, 6, 6, 0, 4, 4, 4, 4, 0, 5])

    # Reshape the array into a 2D array with shape (1, 12)
    reshaped_array = input_array.reshape(1, 12)

    fixed_point_array = np.array([abs(int(decimal_to_fp16x16(num))) for num in input_array])

    legal_state = fixed_point_array

    (result, request_id) = prediction(legal_state, 289, 1)
    return result, request_id

print(execution())