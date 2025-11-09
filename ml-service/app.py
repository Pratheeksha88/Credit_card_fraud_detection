from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import traceback

app = Flask(__name__)
CORS(app)

# Load the trained model
try:
    model = joblib.load('model.pkl')
    print("✅ Model loaded successfully!")
except Exception as e:
    print("❌ Error loading model:", e)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files['file']
        df = pd.read_csv(file)

        if df.empty:
            return jsonify({"error": "Uploaded CSV is empty"}), 400

        # --- FIX STARTS HERE ---
        # Get model's trained feature names
        trained_features = None
        if hasattr(model, "feature_names_in_"):
            trained_features = model.feature_names_in_.tolist()

        # Select only the columns the model expects
        if trained_features:
            X = df[[col for col in trained_features if col in df.columns]]
        else:
            X = df.select_dtypes(include=['float64', 'int64'])
        # --- FIX ENDS HERE ---

        # Make predictions
        preds = model.predict(X).tolist()
        probs = (
            model.predict_proba(X)[:, 1].tolist()
            if hasattr(model, "predict_proba")
            else [0] * len(preds)
        )

        print("✅ Predictions successful!")
        return jsonify({"predictions": preds, "probabilities": probs})

    except Exception as e:
        print("❌ Error during prediction:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
