from flask import Blueprint, request, jsonify
from models import db, Book

api_bp = Blueprint("api", __name__)

@api_bp.route("/books", methods=["GET"])
def get_books():
    # 검색어 & 페이지 처리
    search = request.args.get('search', '', type=str)
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    query = Book.query
    if search:
        query = query.filter(
            Book.title.ilike(f"%{search}%") |
            Book.author.ilike(f"%{search}%")
        )

    pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    books = [book.to_dict() for book in pagination.items]

    return jsonify({
        "books": books,
        "total": pagination.total,
        "page": pagination.page,
        "pages": pagination.pages
    })

@api_bp.route("/books", methods=["POST"])
def create_book():
    data = request.json
    new_book = Book(
        title=data.get('title'),
        author=data.get('author'),
        quantity=data.get('quantity', 1)
    )
    db.session.add(new_book)
    db.session.commit()
    return jsonify({"message": "Book added successfully."}), 201
