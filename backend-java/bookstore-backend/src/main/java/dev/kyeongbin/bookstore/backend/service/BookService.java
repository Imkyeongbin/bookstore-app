package dev.kyeongbin.bookstore.backend.service;

import dev.kyeongbin.bookstore.backend.dto.BookResponseDto;
import dev.kyeongbin.bookstore.backend.model.Book;
import dev.kyeongbin.bookstore.backend.repository.BookRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Transactional(readOnly = true)
    public BookResponseDto getAllBooks(String search, int page, int perPage) {
        Pageable pageable = PageRequest.of(page - 1, perPage);
        Page<Book> bookPage;

        if (search != null && !search.trim().isEmpty()) {
            bookPage = bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(search, search, pageable);
        } else {
            bookPage = bookRepository.findAll(pageable);
        }

        BookResponseDto response = new BookResponseDto();
        response.setBooks(bookPage.getContent());
        response.setTotal(bookPage.getTotalElements());
        response.setPage(bookPage.getNumber() + 1);
        response.setPages(bookPage.getTotalPages());
        return response;
    }

    @Transactional(readOnly = true)
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    @Transactional
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    @Transactional
    public Optional<Book> updateBook(Long id, Book bookDetails) {
        return bookRepository.findById(id).map(book -> {
            book.setTitle(bookDetails.getTitle());
            book.setAuthor(bookDetails.getAuthor());
            book.setQuantity(bookDetails.getQuantity());
            return bookRepository.save(book);
        });
    }

    @Transactional
    public boolean deleteBook(Long id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            return true;
        }
        return false;
    }
}