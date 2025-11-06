from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd


app = Flask(__name__)
CORS(app)
model = joblib.load('model.pkl')


@app.route('/predict', methods=['POST'])
def predict():
data = request.get_json()
features = data.get('features')
# features can be a single dict, list of dicts, or 2D array
if isinstance(features, list):
X = pd.DataFrame(features)
else:
X = pd.DataFrame([features])
probs = model.predict_proba(X)[:, 1].tolist()
preds = model.predict(X).tolist()
return jsonify({ 'predictions': preds, 'probabilities': probs })


if __name__ == '__main__':
app.run(host='0.0.0.0', port=5000)