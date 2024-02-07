import pickle
import pandas as pd
from sklearn.linear_model import LogisticRegression
from flask import Flask, request, jsonify

app = Flask(__name__)

# curl -X POST http://localhost:5000/api/predict -H "Content-Type: application/json" -d "[[100,50],[78,67]]"
@app.route('/api/predict', methods=['POST'])
def predict():
    with open('model.pkl', 'rb') as file:
        model = pickle.load(file)

    # test_data = [[185,53], [185,5], [100,45]]
    data = request.get_json()
    # print(data)
    df = pd.DataFrame(data, columns=['Glucose','BMI'])
    predict = model.predict(df)
    return jsonify({'predicted_values': predict.tolist()})

if __name__ == '__main__':
    app.run(debug=True)