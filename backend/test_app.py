# backend/test_app.py
import json
from app import app, db
from models import Book

def setup_module(module):
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.app_context():
        db.create_all()

def teardown_module(module):
    with app.app_context():
        db.drop_all()

def test_create_book():
    with app.test_client() as client:
        res = client.post('/api/books', json={
            "title": "Test Book",
            "author": "Test Author",
            "quantity": 5
        })
        assert res.status_code == 201

def test_get_books():
    with app.test_client() as client:
        res = client.get('/api/books')
        data = json.loads(res.data)
        assert res.status_code == 200
        assert 'books' in data
