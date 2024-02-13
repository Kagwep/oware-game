from giza_actions.action import Action, action
from giza_actions.task import task
from giza_actions.model import GizaModel
import numpy as np


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

    legal_state = reshaped_array

    (result, request_id) = prediction(legal_state, 289, 1)
    return result, request_id

print(execution())