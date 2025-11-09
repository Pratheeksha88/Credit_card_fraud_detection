import joblib
import json
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# --- Load model and features ---
try:
    wrapped = joblib.load("model.pkl")

    # Handle both wrapped and plain models
    if isinstance(wrapped, dict):
        model = wrapped.get("model", None)
        scaler = wrapped.get("scaler", None)
        feature_names = wrapped.get("feature_names", None)
        print("✅ Wrapped model loaded successfully!")
    else:
        model = wrapped
        scaler = None
        feature_names = None
        print("✅ Plain model loaded successfully!")

    # Try loading feature names from JSON (if exists)
    if feature_names is None:
        try:
            with open("feature_names.json", "r") as f:
                feature_names = json.load(f)
                print("✅ Loaded feature_names.json")
        except FileNotFoundError:
            print("⚠️ feature_names.json not found — will infer from CSV")

except Exception as e:
    print("❌ Could not load model:", e)
    model = None
    feature_names = None


# --- Prediction Route ---
@app.route("/predict", methods=["POST"])
def predict():
    try:
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500

        if "file" not in request.files:
            return jsonify({"error": "No file provided"}), 400

        file = request.files["file"]
        df = pd.read_csv(file)

        if df.empty:
            return jsonify({"error": "Uploaded CSV is empty"}), 400

        # --- Align columns to model's training features ---
        # Prefer wrapped feature list, or infer from model
        expected = []
        if feature_names:
            expected = [c.strip() for c in feature_names]
        elif hasattr(model, "feature_names_in_"):
            expected = list(model.feature_names_in_)
        else:
            expected = list(df.columns)

        # Keep only expected columns (drop extras)
        available = [c for c in expected if c in df.columns]
        df = df[available]

        # Add any missing columns with zeros
        missing = [c for c in expected if c not in df.columns]
        for c in missing:
            df[c] = 0

        # Ensure order matches training
        df = df[expected]

        print(f"✅ Final aligned features: {len(expected)} columns")
        if missing:
            print("⚠️ Missing columns filled with 0:", missing)

        # --- Optional scaling ---
        if "scaler" in locals() and scaler is not None:
            df = pd.DataFrame(scaler.transform(df), columns=df.columns)

        # --- Prediction ---
        preds = model.predict(df)
        probs = (
            model.predict_proba(df)[:, 1].tolist()
            if hasattr(model, "predict_proba")
            else []
        )

        return jsonify({
            "predictions": preds.tolist(),
            "probabilities": probs
        })

    except Exception as e:
        import traceback
        print("🔥 Prediction error:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500



# --- Run Server ---
if __name__ == "__main__":
    print("🚀 Flask ML API running on http://127.0.0.1:5000")
    app.run(host="0.0.0.0", port=5000)
