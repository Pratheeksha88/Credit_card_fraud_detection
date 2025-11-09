import kagglehub

# Download the Credit Card Fraud Detection dataset
path = kagglehub.dataset_download("mlg-ulb/creditcardfraud")

print("✅ Dataset downloaded successfully!")
print("📂 Path to dataset files:", path)
