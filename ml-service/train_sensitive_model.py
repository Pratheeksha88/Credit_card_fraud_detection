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

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Apply SMOTE balancing
print("⚖️ Applying SMOTE balancing...")
sm = SMOTE(random_state=42)
X_res, y_res = sm.fit_resample(X_scaled, y)

# ⚡ Train a more sensitive RandomForest
# - class_weight makes frauds more important
# - higher max_depth and more estimators help pick up rare patterns
print("🌲 Training fraud-sensitive RandomForest...")
model = RandomForestClassifier(
    n_estimators=300,
    max_depth=20,
    random_state=42,
    class_weight={0: 1, 1: 4},  # Fraud gets 4x more importance
    min_samples_leaf=2,
    n_jobs=-1
)
model.fit(X_res, y_res)

print("✅ Training done!")
print("Fraud ratio after SMOTE:", dict(pd.Series(y_res).value_counts()))

# Save model and metadata
joblib.dump({
    "model": model,
    "scaler": scaler,
    "feature_names": list(X.columns)
}, "model.pkl")

print("💾 Saved new sensitive model as model.pkl")

# Quick test
test_fraud = X_res[y_res == 1][:10]
preds = model.predict(test_fraud)
print("🧠 Test fraud predictions:", preds)
