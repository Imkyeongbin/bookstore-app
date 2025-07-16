package dev.kyeongbin.bookstore.backend.controller;

import dev.kyeongbin.bookstore.backend.dto.BookResponseDto;
import dev.kyeongbin.bookstore.backend.model.Book;
import dev.kyeongbin.bookstore.backend.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class BookController {
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/books")
    public ResponseEntity<BookResponseDto> getBooks(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int per_page) {
        return ResponseEntity.ok(bookService.getAllBooks(search, page, per_page));
    }

    @GetMapping("/books/{id}")
    public ResponseEntity<?> getBook(@PathVariable Long id) {
        Optional<Book> bookOptional = bookService.getBookById(id);

        if (bookOptional.isPresent()) {
            return ResponseEntity.ok(bookOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Book not found"));
        }
    }

    @PostMapping("/books")
    public ResponseEntity<?> createBook(@RequestBody Book book) {
        Book newBook = bookService.createBook(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Book added successfully.", "book", newBook));
    }

    @PutMapping("/books/{id}")
    public ResponseEntity<?> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        return bookService.updateBook(id, bookDetails)
                .map(updatedBook -> ResponseEntity.ok(Map.of("message", "Book updated successfully.")))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Book not found")));
    }

    @DeleteMapping("/books/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        if (bookService.deleteBook(id)) {
            return ResponseEntity.ok(Map.of("message", "삭제 성공"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "해당 책이 없습니다"));
        }
    }
}