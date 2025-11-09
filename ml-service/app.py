import joblib
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# --- Load Model ---
try:
    wrapped = joblib.load("model.pkl")
    model = wrapped["model"]
    scaler = wrapped["scaler"]
    feature_names = wrapped["feature_names"]
    print("✅ Wrapped model loaded successfully!")
    print(f"🧩 Model expects {len(feature_names)} features.")
except Exception as e:
    print("❌ Could not load model:", e)
    model, scaler, feature_names = None, None, None


# --- Predict Route ---
@app.route("/predict", methods=["POST"])
def predict():
    try:
        file = request.files["file"]
        df = pd.read_csv(file)

        print(f"📥 Uploaded shape: {df.shape}")
        print("🔍 Raw columns:", list(df.columns))

        # Align columns — ensure all features exist
        for col in feature_names:
            if col not in df.columns:
                df[col] = 0.0

        df = df[feature_names].apply(pd.to_numeric, errors="coerce").fillna(0)

        # Scale data
        X_scaled = scaler.transform(df)

        # Get probabilities
        probs = model.predict_proba(X_scaled)[:, 1]

        # Custom fraud threshold — detect more cases
        preds = (probs >= 0.3).astype(int)

        fraud_count = int((preds == 1).sum())
        legit_count = int((preds == 0).sum())

        print(f"✅ Predictions done! Fraud: {fraud_count}, Legitimate: {legit_count}")
        print("📊 Probabilities:", probs.tolist())

        return jsonify({
            "predictions": preds.tolist(),
            "probabilities": probs.tolist(),
            "fraud_count": fraud_count,
            "legit_count": legit_count
        })

    except Exception as e:
        import traceback
        print("🔥 Prediction error:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


# --- Run App ---
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
