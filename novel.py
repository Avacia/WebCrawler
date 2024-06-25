from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup


app = Flask(__name__)
CORS(app)

current_url = f"https://www.twbook.cc/1512441815/400.html"


def fetch_data(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        paragraphs = [p.get_text() for p in soup.find_all('p')]
        
        cached_data = {
            "url": url,
            "paragraphs": paragraphs,
        }
    
    except requests.exceptions.RequestException as e:
        return (f'Error requesting {url}: {str(e)}')
    
    return cached_data

@app.route('/api/data', methods=['GET'])

def get_data():
    global current_url
    url = request.args.get('url', current_url)
    current_url = url
    data = fetch_data(url)
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
