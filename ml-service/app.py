import joblib
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# --- Load model and metadata ---
try:
    wrapped = joblib.load("model.pkl")
    model = wrapped["model"]
    scaler = wrapped["scaler"]
    feature_names = wrapped["feature_names"]
    print("✅ Wrapped model loaded successfully!")
except Exception as e:
    print("❌ Could not load model:", e)
    model, scaler, feature_names = None, None, None


@app.route("/predict", methods=["POST"])
def predict():
    try:
        file = request.files["file"]
        df = pd.read_csv(file)

        # Align columns safely
        common_cols = [col for col in feature_names if col in df.columns]

        # Add missing columns as zeros (model expects them)
        missing_cols = [col for col in feature_names if col not in df.columns]
        for col in missing_cols:
            df[col] = 0.0

        # Reorder columns to match training order
        df = df[feature_names]

        # Scale the data
        X_scaled = scaler.transform(df)

        # Predict
        preds = model.predict(X_scaled)
        probs = (
            model.predict_proba(X_scaled)[:, 1].tolist()
            if hasattr(model, "predict_proba")
            else []
        )

        fraud_count = int((preds == 1).sum())
        legit_count = int((preds == 0).sum())

        print(f"✅ Predictions done! Fraud: {fraud_count}, Legitimate: {legit_count}")

        return jsonify(
            {
                "predictions": preds.tolist(),
                "probabilities": probs,
                "fraud_count": fraud_count,
                "legit_count": legit_count,
            }
        )

    except Exception as e:
        import traceback

        print("🔥 Prediction error:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
