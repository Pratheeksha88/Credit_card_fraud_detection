# train_real_model.py
import os
import json
import joblib
import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
from imblearn.over_sampling import SMOTE

# -------- CONFIG --------
DATA_PATH = os.path.join("data", "creditcard.csv")   # place dataset here
MODEL_OUT = "model.pkl"
FEATURES_OUT = "feature_names.json"
RANDOM_STATE = 42
TEST_SIZE = 0.2
# ------------------------

def load_data(path):
    df = pd.read_csv(path)
    return df

def prepare_features(df):
    # Kaggle dataset has Time, V1..V28, Amount, Class
    # we will use V1..V28 and Amount (drop Time)
    cols = [c for c in df.columns if c.startswith("V")] + ["Amount"]
    X = df[cols].copy()
    y = df["Class"].copy()
    return X, y

def main():
    print("Loading data...")
    df = load_data(DATA_PATH)
    print("Rows:", len(df))
    X, y = prepare_features(df)

    # train/test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=TEST_SIZE, random_state=RANDOM_STATE, stratify=y
    )

    # scale features (important for many models)
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Handle imbalance with SMOTE on the training set only
    print("Original training class distribution:\n", pd.Series(y_train).value_counts())
    sm = SMOTE(random_state=RANDOM_STATE)
    X_res, y_res = sm.fit_resample(X_train_scaled, y_train)
    print("Post-SMOTE training class distribution:\n", pd.Series(y_res).value_counts())

    # Train a RandomForest
    print("Training RandomForest...")
    model = RandomForestClassifier(n_estimators=200, random_state=RANDOM_STATE, n_jobs=-1)
    model.fit(X_res, y_res)

    # Wrap scaler + model into a single pipeline-like object to save together
    # We'll store a dict with scaler and model and the feature names
    wrapped = {
        "scaler": scaler,
        "model": model,
        "feature_names": list(X.columns)
    }

    # Evaluate
    print("Evaluating on test set...")
    X_test_scaled = scaler.transform(X_test)  # already scaled above but ensure
    y_pred = model.predict(X_test_scaled)
    y_proba = model.predict_proba(X_test_scaled)[:, 1] if hasattr(model, "predict_proba") else None

    print("Classification report:")
    print(classification_report(y_test, y_pred, digits=4))
    if y_proba is not None:
        print("ROC-AUC:", roc_auc_score(y_test, y_proba))

    # Save model and feature list
    print(f"Saving model to {MODEL_OUT} ...")
    joblib.dump(wrapped, MODEL_OUT)

    # Save the feature names separately for the Flask service to load and align columns
    with open(FEATURES_OUT, "w") as f:
        json.dump(list(X.columns), f)

    print("Done. model.pkl and feature_names.json created.")

if __name__ == "__main__":
    main()
