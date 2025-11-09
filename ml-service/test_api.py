import requests

url = "http://127.0.0.1:5000/predict"
files = {"file": open("test_transactions.csv", "rb")}

response = requests.post(url, files=files)
print(response.status_code)
print(response.json())
