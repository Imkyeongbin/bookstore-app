package dev.kyeongbin.bookstore.backend.util;

import dev.kyeongbin.bookstore.backend.model.Book;
import dev.kyeongbin.bookstore.backend.repository.BookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.IntStream;

@Component
public class DataInitializer implements CommandLineRunner {
    private final BookRepository bookRepository;

    public DataInitializer(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (bookRepository.count() == 0) {
            List<Book> sampleBooks = IntStream.range(0, 23)
                    .mapToObj(i -> new Book(null, "Book " + (i + 1), "Author " + (i + 1), (i % 5) + 1))
                    .toList();
            bookRepository.saveAll(sampleBooks);
            System.out.println("✅ Sample books have been created.");
        }
    }
}