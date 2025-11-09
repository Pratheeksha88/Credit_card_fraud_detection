import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from imblearn.over_sampling import SMOTE
import joblib

# Load dataset
print("Loading data...")
df = pd.read_csv("creditcard.csv")  # make sure this path is correct

X = df.drop(columns=["Class"])
y = df["Class"]

# Balance the dataset using SMOTE
print("Applying SMOTE...")
smote = SMOTE(random_state=42)
X_res, y_res = smote.fit_resample(X, y)

# Scale the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_res)

# Train model
print("Training RandomForest...")
model = RandomForestClassifier(
    n_estimators=200, max_depth=10, random_state=42, n_jobs=-1
)
model.fit(X_scaled, y_res)

# Save wrapped model safely
wrapped_model = {
    "model": model,
    "scaler": scaler,
    "feature_names": list(X.columns)
}

joblib.dump(wrapped_model, "model.pkl")
print("✅ Model trained and saved as model.pkl")
