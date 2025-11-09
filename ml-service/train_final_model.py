import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from imblearn.over_sampling import SMOTE
import joblib

print("📥 Loading dataset...")
df = pd.read_csv("data/creditcard.csv")

X = df.drop(columns=["Class"])
y = df["Class"]

print(f"Original shape: {X.shape}, Fraud cases: {y.sum()}")

# Balance data with SMOTE
smote = SMOTE(random_state=42)
X_res, y_res = smote.fit_resample(X, y)

# Scale numeric data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_res)

# Train model
print("🎯 Training model...")
model = RandomForestClassifier(
    n_estimators=100, max_depth=12, random_state=42, n_jobs=-1
)
model.fit(X_scaled, y_res)

# Save all objects together
wrapped = {
    "model": model,
    "scaler": scaler,
    "feature_names": list(X.columns)
}
joblib.dump(wrapped, "model.pkl")

print("✅ Model trained and saved successfully with scaler + features!")
