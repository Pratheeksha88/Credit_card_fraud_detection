import joblib
import json
import re
import unicodedata
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# --- Load model safely ---
try:
    wrapped = joblib.load("model.pkl")
    model = wrapped["model"]
    scaler = wrapped["scaler"]
    feature_names = wrapped["feature_names"]
    print("✅ Wrapped model loaded successfully!")
except Exception as e:
    print("❌ Could not load model:", e)
    model, scaler, feature_names = None, None, None


# --- Helper to clean weird column names ---
def clean_column(col):
    """
    Cleans column names by:
    - Normalizing Unicode characters
    - Removing all non-alphanumeric characters (including spaces, special chars, etc.)
    """
    col = unicodedata.normalize("NFKD", str(col))  # normalize weird Unicode forms
    col = re.sub(r"[^A-Za-z0-9]+", "", col)        # remove anything not alphanumeric
    return col


# --- Prediction Route ---
@app.route("/predict", methods=["POST"])
def predict():
    try:
        file = request.files["file"]

        # ✅ Read and clean raw file content before pandas parses it
        raw_content = file.read().decode("utf-8", errors="ignore")

        # Remove all non-printable and special Unicode characters from the header
        import string
        cleaned_content = ''.join(
            ch for ch in raw_content if ch.isprintable() or ch in string.whitespace
        )

        # Convert cleaned string back to a readable CSV for pandas
        from io import StringIO
        df = pd.read_csv(StringIO(cleaned_content))

        # Clean up column names once more (just in case)
        df.columns = [clean_column(c) for c in df.columns]

        print(f"📥 Uploaded shape: {df.shape}")
        print("🧩 Cleaned columns:", list(df.columns))

        # --- Ensure all expected features exist ---
        for col in feature_names:
            if col not in df.columns:
                df[col] = 0.0

        # Align, convert and scale
        df = df[feature_names].apply(pd.to_numeric, errors="coerce").fillna(0)
        X_scaled = scaler.transform(df)

        preds = model.predict(X_scaled)
        probs = (
            model.predict_proba(X_scaled)[:, 1].tolist()
            if hasattr(model, "predict_proba")
            else []
        )

        fraud_count = int((preds == 1).sum())
        legit_count = int((preds == 0).sum())

        print(f"✅ Predictions done! Fraud: {fraud_count}, Legitimate: {legit_count}")

        return jsonify({
            "predictions": preds.tolist(),
            "probabilities": probs,
            "fraud_count": fraud_count,
            "legit_count": legit_count
        })

    except Exception as e:
        import traceback
        print("🔥 Prediction error:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


# --- Start Server ---
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
