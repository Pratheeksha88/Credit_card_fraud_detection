import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# Create fake transaction-like data
np.random.seed(42)
data = pd.DataFrame({
    "V1": np.random.randn(1000),
    "V2": np.random.randn(1000),
    "V3": np.random.randn(1000),
    "Amount": np.random.uniform(1, 500, 1000),
})
labels = np.random.choice([0, 1], size=1000, p=[0.97, 0.03])  # 3% fraud

# Train a simple model
model = RandomForestClassifier(n_estimators=50, random_state=42)
model.fit(data, labels)

# Save it as model.pkl
joblib.dump(model, "model.pkl")

print("✅ Dummy model trained and saved successfully!")
