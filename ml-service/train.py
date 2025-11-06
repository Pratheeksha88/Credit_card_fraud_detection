import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, confusion_matrix
import kagglehub
import os

# -------------------------------
#  Download the Kaggle dataset automatically
# -------------------------------
print("Downloading dataset from KaggleHub...")
dataset_path = kagglehub.dataset_download("mlg-ulb/creditcardfraud")
csv_path = os.path.join(dataset_path, "creditcard.csv")
print("✅ Dataset downloaded successfully!")
print("📂 Path:", csv_path)

# -------------------------------
#  Load and train model
# -------------------------------
df = pd.read_csv(csv_path)
X = df.drop(columns=["Class"])
y = df["Class"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

pipe = Pipeline([
    ("scaler", StandardScaler()),
    ("rf", RandomForestClassifier(n_estimators=100, class_weight="balanced", random_state=42))
])

pipe.fit(X_train, y_train)
preds = pipe.predict(X_test)

print("Model performance report:")
print(classification_report(y_test, preds))
print("Confusion Matrix:")
print(confusion_matrix(y_test, preds))

joblib.dump(pipe, "model.pkl")
print("✅ Model trained and saved to model.pkl")
