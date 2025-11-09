import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, roc_auc_score
from imblearn.over_sampling import SMOTE
import joblib

print("📂 Loading dataset...")
df = pd.read_csv("data/creditcard.csv")

X = df.drop("Class", axis=1)
y = df["Class"]

print("Before balancing:")
print(y.value_counts())

# --- Split BEFORE SMOTE ---
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# --- Apply SMOTE only on the training set ---
sm = SMOTE(random_state=42)
X_train_res, y_train_res = sm.fit_resample(X_train, y_train)

print("\nAfter SMOTE:")
print(y_train_res.value_counts())

# --- Standardize features ---
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train_res)
X_test_scaled = scaler.transform(X_test)

# --- Random Forest with class weights ---
rf = RandomForestClassifier(
    n_estimators=250,
    max_depth=12,
    class_weight="balanced_subsample",
    n_jobs=-1,
    random_state=42
)

print("\n🚀 Training model...")
rf.fit(X_train_scaled, y_train_res)

# --- Evaluate ---
y_pred = rf.predict(X_test_scaled)
probs = rf.predict_proba(X_test_scaled)[:, 1]

print("\n📊 Classification report:")
print(classification_report(y_test, y_pred))
print("ROC-AUC:", roc_auc_score(y_test, probs))

# --- Save model ---
wrapped = {
    "model": rf,
    "scaler": scaler,
    "feature_names": X.columns.tolist()
}
joblib.dump(wrapped, "model.pkl")

print("\n✅ New balanced model saved successfully as model.pkl")
