import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from imblearn.over_sampling import SMOTE
import joblib
import numpy as np

print("🚀 Loading dataset...")
df = pd.read_csv("creditcard.csv")

# Split features and labels
X = df.drop(columns=["Class"])
y = df["Class"]

# --- Split before SMOTE ---
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# --- Apply SMOTE balancing on training set ---
print("⚖️ Applying SMOTE balancing...")
sm = SMOTE(random_state=42)
X_res, y_res = sm.fit_resample(X_train, y_train)

# --- Scale AFTER SMOTE ---
scaler = StandardScaler()
X_res_scaled = scaler.fit_transform(X_res)
X_test_scaled = scaler.transform(X_test)

# --- Train a fraud-sensitive RandomForest ---
print("🌲 Training fraud-sensitive RandomForest...")
model = RandomForestClassifier(
    n_estimators=300,
    max_depth=20,
    random_state=42,
    class_weight={0: 1, 1: 4},  # Fraud 4x more important
    min_samples_leaf=2,
    n_jobs=-1
)
model.fit(X_res_scaled, y_res)

print("✅ Training done!")
print("Fraud ratio after SMOTE:", dict(pd.Series(y_res).value_counts()))

# --- Evaluate quick test ---
from sklearn.metrics import classification_report
y_pred = model.predict(X_test_scaled)
print("\n📊 Model performance on real test data:")
print(classification_report(y_test, y_pred, digits=4))

# --- Save model and metadata ---
joblib.dump({
    "model": model,
    "scaler": scaler,
    "feature_names": list(X.columns)
}, "model.pkl")

print("💾 Saved new sensitive model as model.pkl")

# --- Quick sanity check ---
test_fraud = X_res[y_res == 1][:10]
test_scaled = scaler.transform(test_fraud)
preds = model.predict_proba(test_scaled)[:, 1]
print("🧠 Example fraud probabilities:", preds)

